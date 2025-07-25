# VGO Idle Clicker

In this VGO Idle Clicker game, the goal is to produce as many episodes of VGO as possible. To be able to do that you click the produce button and buy store items that make production feel like it's running on its own.

## Contribution

I want this project to be accessible to as many contributors as possible. Therefor, this project shall only use vanilla JavaScript, HTML and CSS. This project shall not use and JS framework like React, Vue, Angular, etc.! Anyone with a GitHub account can contribute by adding issues (bugs, ideas, feature requests) or sending pull requests. Even if you don't have a GitHub account, just send me a message in the VGO Discord!

## How To run the game

Download the repository, and double click on `src/index.html`. Have fun!

## Content

### Store Items

| Store Item | Cost | EPS<sup>1</sup> | Reason why it produces episodes | Implemented |
|:--|:--|:--|:--|:--|
| Subscriber | 15 | 0.1 | You are so motivated, that producing episodes doesn't feel like producing them on your own. | ✅ |
| Locations | 100 | 1 | You gotta be somewhere. Fort Wayne, maybe, or trapped somewhere. | ✅ |
| High Quality Equipment | 1.100 | 8 | The better the quality, the easier production becomes | - |
| Special Episodes | 12.000 | 47 | Special Episodes makes production motivating again. | - |
| You Mothers | 130.000 | 260 | Can't have enough of those! | - |

<hr />
<sup>1</sup> Episodes Per Second

### Hosts Store

There are three hosts slots. Each host grants unique perks. Those perks can apply as soon as the host is appointed (i.e. a one time episodes boost or boosting a specific item), during each calculation (i.e. boosting production rate) or on dismissal of the host.

| Host | Appointment | Episode Production | Dismissal |
|:--|:--|:--|:--|
| John | Boosts `johnsSmoker`'s item multiplier by 100 and reduces it's cost by 100. | - | - |
| Michelle | - | - | - |
| Kyle | - | 20% production increase. | - |
| Matt | Increases click strength by 1. | - | Decreases Click Strength by 1 |
| Ry | - | Random 1:10000 chance to get 100 episodes. | - |
| Kevin | - | - | - |
| Turkey | - | - | - |
| Witch | - | - | - |


#### Technical Mechanism

The `hostsStore` object in `src/hostsStore.js` lists all hosts. each host has three functions:

```javascript
var hosts = {
    someHost: {
        appoint: function(state) {
            // called when the user appoints the host
            boostStore.johnsSmoker.cost = boostStore.johnsSmoker.cost - 100
            boostStore.johnsSmoker.itemMultiplier = boostStore.johnsSmoker.itemMultiplier + 100
        },
        dismiss: function(state) {
            // called when the user dismisses the host
            boostStore.johnsSmoker.cost = boostStore.johnsSmoker.cost + 100
            boostStore.johnsSmoker.itemMultiplier = boostStore.johnsSmoker.itemMultiplier - 100
        },
        productionModifier: function(state) {
            // called in Game.calculateEpisodes() before the final caluclation of the produced episodes in the current tick
            state.episodes = state.episodes + 10
            state.currentProduction = state.currentProduction * 1.1
        }
    }
}
```



### Ideas

- Boost (functionality: done) - temporarily boosts store item's EPS
  - John's Smoker
  - Michelle's Braun Laser
  - Matt's Golden Game Stop Card
  - Tiger's ???
  - Ry's ???
- Upgrades (functionality: -) - permanently boosts store item's EPS
- Unklock hosts (current and historical) - Boost all store item's EPS
- Unlock Mixer: ??? (mini game?)
