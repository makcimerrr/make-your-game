var clickSound = new Audio("audio/shotgun.mp3");

document.getElementById("startButton").addEventListener("click", function () {
  window.location.href = "html/game.html";
});

document.addEventListener("click", function () {
  clickSound.currentTime = 0;

  clickSound.play();
});
