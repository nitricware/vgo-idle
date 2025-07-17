class Game {
    state = null;

    uiElements = {
        episodeCounter: document.getElementById("episode-counter"),
        produceEpisode: document.getElementById("produce-episode"),
        episodesPerSecond: document.getElementById("episodes-per-second"),
        lastSave: document.getElementById("lastSave"),
        errorLog: document.getElementById("errorLog"),
        quote: document.getElementById("quote"),
        items: {
            subscriber: {
                counter: document.getElementById("subscriber-counter"),
                cost: document.getElementById("subscriber-cost")
            },
            locations: {
                counter: document.getElementById("locations-counter"),
                cost: document.getElementById("locations-cost")
            }
        },
        boosts: {
            johnsSmoker: {
                counter: document.getElementById("johnsSmoker-counter"),
                cost: document.getElementById("johnsSmoker-cost")
            },
            michellesBraunLaser: {
                counter: document.getElementById("michellesBraunLaser-counter"),
                cost: document.getElementById("michellesBraunLaser-cost")
            }
        },
        hosts: {
            slot1: {
                displayName: document.getElementById("host1-displayName"),
                selectField: document.getElementById("host1-select"),
                hostPicture: document.getElementById("host1-picture")
            },
            slot2: {
                displayName: document.getElementById("host2-displayName"),
                selectField: document.getElementById("host2-select"),
                hostPicture: document.getElementById("host2-picture")
            },
            slot3: {
                displayName: document.getElementById("host3-displayName"),
                selectField: document.getElementById("host3-select"),
                hostPicture: document.getElementById("host3-picture")
            }
        }
    }

    lastTick = 0;
    tenSecondsCounter = 0;
    priceMultiplierBase = 1.15;

    constructor(gameState) {
        this.state = gameState;
        this.updateUI();
    }

    tick(currentTick) {
        let timePassed = (currentTick - this.lastTick) / 1000;
        this.lastTick = currentTick;

        this.tenSecondsCounter = this.tenSecondsCounter + timePassed;

        if (this.tenSecondsCounter >= 10) {
            this.tenSecondsCounter = 0;
            this.roatateQuote();
        }

        this.calculateEpisodes(timePassed);
        this.calculateBoost(timePassed);
        this.updateUI();
    }

    produceEpisode() {
        this.state.episodes = this.state.episodes + (1 * this.state.clickStrength);
        this.updateUI();
    }

    save() {
        this.state.save();
    }

    load() {
        this.state.load();
        this.updateUI();
        for (let s in this.state.hosts) {
            if (this.state.hosts[s].identifier !== null) {
                this.uiElements.hosts[s].displayName.innerHTML = hostsStore[this.state.hosts[s].identifier].displayName;
                this.uiElements.hosts[s].selectField.value = this.state.hosts[s].identifier;
                this.blockHostInSelect(s);
            }
        }
    }

    calculateEpisodes(secondsPassed) {
        this.state.currentProduction = 0.0
        for (let e in this.state.items) {
            this.state.currentProduction = this.state.currentProduction + (itemStore[e].autoProduce * this.state.items[e].count * this.state.items[e].multiplier);
        }

        if (this.state.currentProduction == 0.00) {
            return
        }

        for (let h in this.state.hosts) {
            if (this.state.hosts[h].identifier !== null) {
                hostsStore[this.state.hosts[h].identifier].productionModifier(this.state);
            }
        }

        this.state.episodes = this.state.episodes + (this.state.currentProduction * secondsPassed);
    }

    calculateBoost(secondsPassed) {
        for (let b in this.state.boosts) {
            if (this.state.boosts[b].count > 0) {
                for (let i = 0; i < this.state.boosts[b].remainingTime.length; i++) {
                    this.state.boosts[b].remainingTime[i] = this.state.boosts[b].remainingTime[i] - secondsPassed;
                    if (this.state.boosts[b].remainingTime[i] <= 0) {
                        this.state.boosts[b].count = this.state.boosts[b].count - 1;
                        this.state.boosts[b].remainingTime.splice(i, 1);
                        this.state.items[boostStore[b].boostedItem].multiplier = this.state.items[boostStore[b].boostedItem].multiplier - boostStore[b].itemMultiplier;
                        i--;
                    }
                }
            }
        }
    }

    buy(item) {
        // check if item is in itemStore and production
        if (this.state.episodes >= itemStore[item].cost) {
                    this.state.items[item].count = this.state.items[item].count + 1;
                    this.state.episodes = this.state.episodes - itemStore[item].cost;
                    itemStore[item].cost = itemStore[item].cost * Math.pow(this.priceMultiplierBase, this.state.items[item].count);
                }

        this.updateUI();
    }

    buyBoost(item) {
        if (this.state.episodes >= boostStore[item].cost) {
            this.state.boosts[item].count = this.state.boosts[item].count + 1;
            this.state.episodes = this.state.episodes - boostStore[item].cost;
            this.state.boosts[item].remainingTime.push(boostStore[item].lifeTime);
            this.state.items[boostStore[item].boostedItem].multiplier = this.state.items[boostStore[item].boostedItem].multiplier + boostStore[item].itemMultiplier;
        }
    }

    changeHost(slot, newHost) {
        if (this.state.hosts[slot].identifier != null && this.state.episodes < hostsStore[this.state.hosts[slot].identifier].dismissCost) {
            this.showError("You need at least " + hostsStore[this.state.hosts[slot].identifier].dismissCost + " episodes to dismiss " + hostsStore[this.state.hosts[slot].identifier].displayName + ".");
            this.uiElements.hosts[slot].selectField.value = this.state.hosts[slot].identifier == null ? "none" : this.state.hosts[slot].identifier;
            return;
        } else if (this.state.episodes < hostsStore[newHost].appointCost) {
            this.showError("You need at least " + hostsStore[newHost].appointCost + " episodes to appoint " + hostsStore[newHost].displayName + ".");
            this.uiElements.hosts[slot].selectField.value = this.state.hosts[slot].identifier == null ? "none" : this.state.hosts[slot].identifier;
            return;
        }

        if (this.state.hosts[slot].identifier !== null) {
            hostsStore[this.state.hosts[slot].identifier].dismiss(this.state);
        }

        this.uiElements.hosts[slot].hostPicture.className = "host-picture host-" + newHost;

        this.state.hosts[slot].identifier = newHost == "none" ? null : newHost;

        if (newHost != "none") {
            hostsStore[this.state.hosts[slot].identifier].appoint(this.state);
        }

        this.blockHostInSelect(slot);
    }

    updateUI() {
        this.uiElements.produceEpisode.innerHTML = "Produce " + this.state.clickStrength + " Episodes";
        this.uiElements.episodeCounter.innerHTML = Math.floor(this.state.episodes);
        this.uiElements.episodesPerSecond.innerHTML = this.state.currentProduction.toFixed(2);
        this.uiElements.lastSave.innerHTML = this.state.lastSave == null ? "none" : new Date(this.state.lastSave);

        for (let e in this.state.items) {
            this.uiElements.items[e].counter.innerHTML = this.state.items[e].count;
            this.uiElements.items[e].cost.innerHTML = Math.ceil(itemStore[e].cost);
        }

        for (let b in this.state.boosts) {
            this.uiElements.boosts[b].counter.innerHTML = this.state.boosts[b].count;
            this.uiElements.boosts[b].cost.innerHTML = Math.ceil(boostStore[b].cost);
        }

        for (let s in this.state.hosts) {
            this.uiElements.hosts[s].displayName.innerHTML = this.state.hosts[s].identifier == null ? "None" : hostsStore[this.state.hosts[s].identifier].displayName;
        }
    }

    showError(message) {
        this.uiElements.errorLog.innerHTML = message + "<br />" + this.uiElements.errorLog.innerHTML;
    }

    blockHostInSelect(slot) {
        for (let s in this.uiElements.hosts) {
            if (s != slot) {
                for (let o in this.uiElements.hosts[s].selectField.options) {
                    if (this.uiElements.hosts[s].selectField.options[o].value == this.state.hosts[slot].identifier) {
                        this.uiElements.hosts[s].selectField.options[o].disabled = true;
                    }
                }
            }
        }
    }

    roatateQuote() {
        let quotes = [
            "Drop the canadian looser.",
            "Phil did it again!"
        ]
        this.uiElements.quote.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
    }
}
