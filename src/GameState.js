class GameState {
    episodes = 20000.0;
    clickStrength = 1;
    currentProduction = 0.0;
    lastSave = null;
    
    items = {
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

    hosts = {
        slot1: {
            identifier: null
        },
        slot2: {
            identifier: null
        },
        slot3: {
            identifier: null
        }
    }

    constructor() {
        const lastSaveString = localStorage.getItem("lastSave");
        this.lastSave = lastSaveString === null ? null : new Date(Date.parse(lastSaveString));
    }

    save() {
        localStorage.setItem("episodes", this.episodes);
        localStorage.setItem("clickStrength", this.clickStrength);
        localStorage.setItem("currentProduction", this.currentProduction);
        localStorage.setItem("production", JSON.stringify(this.items));
        localStorage.setItem("boosts", JSON.stringify(this.boosts));
        localStorage.setItem("itemStore", JSON.stringify(itemStore));
        localStorage.setItem("boostStore", JSON.stringify(boostStore));
        localStorage.setItem("hosts", JSON.stringify(this.hosts));

        const saveDate = new Date()
        localStorage.setItem("lastSave", saveDate);

        this.lastSave = saveDate.toString();
    }

    load() {
        this.episodes = parseFloat(localStorage.getItem("episodes"));
        this.clickStrength = parseFloat(localStorage.getItem("clickStrength"));
        this.currentProduction = parseFloat(localStorage.getItem("currentProduction"));
        this.items = JSON.parse(localStorage.getItem("production"));
        this.boosts = JSON.parse(localStorage.getItem("boosts"));
        itemStore = JSON.parse(localStorage.getItem("itemStore"));
        boostStore = JSON.parse(localStorage.getItem("boostStore"));
        this.hosts = JSON.parse(localStorage.getItem("hosts"));
    }
}