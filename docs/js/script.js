window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click",function(){
    //JS, in the current tab, is going to resfresh (reload) the page.
    location.reload();
  })

  function startGame() {
    // console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch(key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
              game.player.directionY= -2;
              break;
          case "ArrowRight":
                game.player.directionX= 0;
                break;
          case "ArrowDown":
            game.player.directionY= 0;

        }
      }
    }
  }
  function handleKeyUp(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    if (possibleKeys.includes(key)) {
      event.preventDefault();

      if (game) {
        switch(key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
              game.player.directionY= 1.5;
              break;
          case "ArrowRight":
                game.player.directionX= 0;
                break;
          case "ArrowDown":
            game.player.directionY= 0;

        }
      }
    }
  }

  window.addEventListener("keydown",handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

}