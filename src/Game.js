class Game {
    episodes = 200.0;
    production = {
        subscriber: {
            count: 0,
            multiplier: 1
        },
        locations: {
            count: 0,
            multiplier: 1
        }
    }

    boosts = {
        johnsSmoker: {
            count: 0,
            remainingTime: []
        },
        michellesBraunLaser: {
            count: 0,
            remainingTime: []
        }
    }

    uiElements = {
        episodeCounter: document.getElementById("episode-counter"),
        episodesPerSecond: document.getElementById("episodes-per-second"),
        lastSave: document.getElementById("lastSave"),
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
        }
    }

    lastTick = 0;
    lastSave = null;

    priceMultiplierBase = 1.15;

    currentProduction = 0.0;

    constructor() {
        const lastSaveString = localStorage.getItem("lastSave");
        this.lastSave = lastSaveString === null ? null : new Date(Date.parse(lastSaveString));
        this.updateUI();
    }

    save() {
        console.log("save...")

        localStorage.setItem("episodes", this.episodes);
        localStorage.setItem("production", JSON.stringify(this.production));
        localStorage.setItem("boosts", JSON.stringify(this.boosts));
        localStorage.setItem("itemStore", JSON.stringify(itemStore));
        localStorage.setItem("boostStore", JSON.stringify(boostStore));
        localStorage.setItem("currentProduction", this.currentProduction);

        saveDate = new Date();

        localStorage.setItem("lastSave", saveDate.toString());

        this.lastSave = saveDate.toString();
    }

    load() {
        console.log("load...")

        this.episodes = parseFloat(localStorage.getItem("episodes"));
        this.production = JSON.parse(localStorage.getItem("production"));
        this.boosts = JSON.parse(localStorage.getItem("boosts"));
        itemStore = JSON.parse(localStorage.getItem("itemStore"));
        boostStore = JSON.parse(localStorage.getItem("boostStore"));
        this.currentProduction = parseFloat(localStorage.getItem("currentProduction"));

        this.updateUI();
    }

    tick(currentTick) {
        let timePassed = (currentTick - this.lastTick) / 1000;
        this.lastTick = currentTick;

        this.calculateEpisodes(timePassed);
        this.calculateBoost(timePassed);
        this.updateUI();
    }

    produceEpisode() {
        this.episodes = this.episodes + 1;
        this.updateUI();
    }

    calculateEpisodes(secondsPassed) {
        this.currentProduction = 0.0
        for (let e in this.production) {
            this.currentProduction = this.currentProduction + (itemStore[e].autoProduce * this.production[e].count * this.production[e].multiplier);
        }

        this.episodes = this.episodes + (this.currentProduction * secondsPassed);
    }

    calculateBoost(secondsPassed) {
        for (let b in this.boosts) {
            if (this.boosts[b].count > 0) {
                for (let i = 0; i < this.boosts[b].remainingTime.length; i++) {
                    this.boosts[b].remainingTime[i] = this.boosts[b].remainingTime[i] - secondsPassed;
                    if (this.boosts[b].remainingTime[i] <= 0) {
                        this.boosts[b].count = this.boosts[b].count - 1;
                        this.boosts[b].remainingTime.splice(i, 1);
                        this.production[boostStore[b].boostedItem].multiplier = this.production[boostStore[b].boostedItem].multiplier - boostStore[b].itemMultiplier;
                        i--;
                    }
                }
            }
        }
    }

    buy(item) {
        // check if item is in itemStore and production
        if (this.episodes >= itemStore[item].cost) {
                    this.production[item].count = this.production[item].count + 1;
                    this.episodes = this.episodes - itemStore[item].cost;
                    itemStore[item].cost = itemStore[item].cost * Math.pow(this.priceMultiplierBase, this.production[item].count);
                }

        this.updateUI();
    }

    buyBoost(item) {
        if (this.episodes >= boostStore[item].cost) {
            this.boosts[item].count = this.boosts[item].count + 1;
            this.episodes = this.episodes - boostStore[item].cost;
            this.boosts[item].remainingTime.push(boostStore[item].lifeTime);
            this.production[boostStore[item].boostedItem].multiplier = this.production[boostStore[item].boostedItem].multiplier + boostStore[item].itemMultiplier;
        }
    }

    updateUI() {
        this.uiElements.episodeCounter.innerHTML = Math.floor(this.episodes);
        this.uiElements.episodesPerSecond.innerHTML = this.currentProduction.toFixed(2);
        this.uiElements.lastSave.innerHTML = this.lastSave == null ? "none" : this.lastSave;

        for (let e in this.production) {
            this.uiElements.items[e].counter.innerHTML = this.production[e].count;
            this.uiElements.items[e].cost.innerHTML = Math.ceil(itemStore[e].cost);
        }

        for (let b in this.boosts) {
            this.uiElements.boosts[b].counter.innerHTML = this.boosts[b].count;
            this.uiElements.boosts[b].cost.innerHTML = Math.ceil(boostStore[b].cost);
        }
    }
}