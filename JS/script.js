var clickSound = new Audio("audio/shotgun.mp3"); // Remplacez 'click-sound.mp3' par le chemin de votre fichier son

document.getElementById("startButton").addEventListener("click", function () {
  // Add code to start your game here
  alert("Game started!");

  // For example, you could redirect to the game page or hide/show elements to start the game
  // window.location.href = 'game.html';
});

document.addEventListener("click", function () {
  clickSound.currentTime = 0;

  clickSound.play();
});
