let s = new GameState();
let g = new Game(s);

function gameLoop (timeStamp) {
    g.tick(timeStamp)
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);