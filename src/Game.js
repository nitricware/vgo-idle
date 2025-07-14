class Game {
    episodes = 200.0;
    production = {
        subscriber: {
            count: 0,
            uielements: {
                counter: document.getElementById("subscriber-counter"),
                cost: document.getElementById("subscriber-cost")
            }
        },
        cohost: {
            count: 0,
            uielements: {
                counter: document.getElementById("cohost-counter"),
                cost: document.getElementById("cohost-cost")
            }
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
        this.updateUI();
    }

    produceEpisode() {
        this.episodes = this.episodes + 1;
        this.updateUI();
    }

    calculateEpisodes(secondsPassed) {
        this.currentProduction = 0.0
        for (let e in this.production) {
            this.currentProduction = this.currentProduction + (storeItems[e].autoProduce * this.production[e].count);
        }

        this.episodes = this.episodes + (this.currentProduction * secondsPassed);
    }

    buy(item) {
        // check if item is in storeItems and production
        if (this.episodes >= storeItems[item].cost) {
                    this.production[item].count = this.production[item].count + 1;
                    this.episodes = this.episodes - storeItems[item].cost;
                    storeItems[item].cost = storeItems[item].cost * Math.pow(this.priceMultiplierBase, this.production[item].count);
                }

        this.updateUI();
    }

    updateUI() {
        this.uiElements.episodeCounter.innerHTML = this.episodes;
        this.uiElements.episodesPerSecond.innerHTML = this.currentProduction;

        for (let e in this.production) {
            this.production[e].uielements.counter.innerHTML = this.production[e].count;
            this.production[e].uielements.cost.innerHTML = Math.ceil(storeItems[e].cost);
        }
    }
}