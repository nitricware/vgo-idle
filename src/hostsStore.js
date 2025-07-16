var hostsStore = {
    john: {
        displayName: "John Jacobsen",
        appointCost: 0,
        dismissCost: 100000,
        appoint: function(state) {
            console.log("john appoint");
            stats.episodes = state.episodes + 100;
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
}
