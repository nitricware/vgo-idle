var hostsStore = {
    john: {
        displayName: "John Jacobsen",
        appointCost: 0,
        dismissCost: 100000,
        appoint: function(state) {
            state.episodes = state.episodes + 100;
        },
        dismiss: function(state) {
            console.log("john dismiss");
        },
        productionModifier: function(stats) {
            console.log("john productionModifier");
        }
    },
    michelle: {
        displayName: "Michelle Madison",
        appointCost: 100,
        dismissCost: 100000,
        appoint: function(state) {
            console.log("michelle appoint");
        },
        dismiss: function(state) {
            console.log("michelle dismiss");
        },
        productionModifier: function(state) {
            console.log("michelle productionModifier");
        }
    },
    matt: {
        displayName: "Matt",
        appointCost: 0,
        dismissCost: 0,
        appoint: function(state) {
            state.clickStrength = state.clickStrength + 1;
        },
        dismiss: function(state) {
            state.clickStrength = state.clickStrength - 1;
        },
        productionModifier: function(state) {
            //console.log("michelle productionModifier");
        }
    },
    ry: {
        displayName: "Ry",
        appointCost: 0,
        dismissCost: 0,
        appoint: function(state) {
            
        },
        dismiss: function(state) {
            
        },
        productionModifier: function(state) {
            let addEpisodes = Math.random() < 0.0001 ? 100 : 0;
            state.episodes = state.episodes + addEpisodes;
        }
    },
    kyle: {
        displayName: "Kyle",
        appointCost: 0,
        dismissCost: 0,
        appoint: function(state) {
            
        },
        dismiss: function(state) {
            
        },
        productionModifier: function(state) {
            state.currentProduction = state.currentProduction * 1.2
        }
    },
}
