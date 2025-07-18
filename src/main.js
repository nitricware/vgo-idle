let s = new GameState();
let u = new GameUI();
u.populateUI();

/*
TOOD: refactor Game() to not load uiElements when instanced
but with a function thats triggered on start()
*/
let g = new Game(s);
g.start();


function gameLoop (timeStamp) {
    g.tick(timeStamp)
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);