let g = new Game();

function gameLoop (timeStamp) {
    g.tick(timeStamp)
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);