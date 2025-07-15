class Game {
    episodes = 200.0;
    production = {
        subscriber: {
            count: 0,
            uielements: {
                counter: document.getElementById("subscriber-counter"),
                cost: document.getElementById("subscriber-cost")
            },
            multiplier: 1
        },
        cohost: {
            count: 0,
            uielements: {
                counter: document.getElementById("cohost-counter"),
                cost: document.getElementById("cohost-cost")
            },
            multiplier: 1
        }
    }

    boosts = {
        johnsSmoker: {
            count: 0,
            uielements: {
                counter: document.getElementById("johnsSmoker-counter"),
                cost: document.getElementById("johnsSmoker-cost")
            },
            remainingTime: []
        },
        michellesBraunLaser: {
            count: 0,
            uielements: {
                counter: document.getElementById("michellesBraunLaser-counter"),
                cost: document.getElementById("michellesBraunLaser-cost")
            },
            remainingTime: []
        }
    }

    lastTick = 0;

    priceMultiplierBase = 1.15;

    currentProduction = 0.0;

    uiElements = {
        episodeCounter: document.getElementById("episode-counter"),
        episodesPerSecond: document.getElementById("episodes-per-second")
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

        for (let e in this.production) {
            this.production[e].uielements.counter.innerHTML = this.production[e].count;
            this.production[e].uielements.cost.innerHTML = Math.ceil(itemStore[e].cost);
        }

        for (let b in this.boosts) {
            this.boosts[b].uielements.counter.innerHTML = this.boosts[b].count;
            this.boosts[b].uielements.cost.innerHTML = Math.ceil(boostStore[b].cost);
        }
    }
}