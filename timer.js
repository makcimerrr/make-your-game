let isGamePaused = false;

function timerShowUp() {
  let time = seconde;

  // Clear any existing interval
  clearInterval(countdown);

  // Show the timer
  timediv.style.translate = "-152px -150px";

  // Format the timer as 00:00
  countdown = setInterval(function () {
    if (!isGamePaused) {
      let minutes = Math.floor(time / 60);
      let remainingtime = time % 60;
      let formattedTime =
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (remainingtime < 10 ? "0" : "") +
        remainingtime;
      timer.textContent = formattedTime;

      if (time <= 2) {
        gameContainer.classList.add("end");
        setTimeout(() => {
          gameContainer.classList.remove("end");
          while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
          }
        }, 8000);
      }

      if (time <= 0) {
        gameContainer.classList.add("invincible");
        gameContainer.classList.add("oneduck?");

        dog.style.translate = "0px -140px";
        dog.style.opacity = "1";
        setTimeout(() => {
          gameContainer.classList.remove("invincible");
          console.log("operationel pour une deuxieme game");
          timer.textContent = `00:${seconde}`;
          if (isExpertDifficulty()) {
            if (!isFailed) {
              startGameExtreme();
            } else {
              return;
            }
          } else {
            return;
          }
        }, 8000);

        clearInterval(countdown);

        setTimeout(() => {
          // Restart the background
          grass.classList.toggle("paused");
          gameContainer.classList.remove("oneduck?");
        }, 1000);

        // Hide the timer
        timediv.style.translate = "-152px 0px";
      }

      time--;

      lastDeadDucks = deadDucks;

      if (time < 0) {
        if (!isExpertDifficulty) {
          // Temps écoulé, déclencher la fonction failed
          failed();
          clearInterval(countdown); // Arrêter le setInterval
        } else {
          if (lastScore === deadDucks) {
            // Temps écoulé, déclencher la fonction failed
            failed();
            clearInterval(countdown); // Arrêter le setInterval
          }
        }
      }
    }
  }, 1000);
}

// Fonction pour mettre en pause le chrono
function pauseTimer() {
  isGamePaused = true;
}

// Fonction pour reprendre le chrono
function resumeTimer() {
  isGamePaused = false;
}

function togglePause() {
  // Ajoutez une vérification pour s'assurer que le menu de départ n'est pas visible
  if (menu.style.zIndex !== "-999") {
    return;
  }
  isPaused = !isPaused;
  pauseMenu.style.display = isPaused ? "block" : "none";
  overlay.style.display = isPaused ? "block" : "none";

  if (isPaused) {
    pauseTimer();
  } else {
    resumeTimer();
  }
  toggleAnimationPause();
  toggleCloudsAnimation(isPaused);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "p" || event.key === "P") {
    togglePause();
  }
});
