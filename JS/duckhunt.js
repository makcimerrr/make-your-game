var clickSound = new Audio("../audio/shotgun.mp3");
var hitmarker = new Audio("../audio/Hit Marker sound effect nv.mp3");

document.addEventListener("click", function () {
  clickSound.currentTime = 0;

  clickSound.play();
});

document.addEventListener("DOMContentLoaded", function () {
  //Différentes div pour le graphisme
  const bird = document.getElementById("bird");
  const zone = document.getElementById("zone");
  const fpsText = document.getElementById("fps");
  const pauseMenu = document.getElementById("pauseMenu");

  function handleBirdClick() {
    hitmarker.currentTime = 0;
    hitmarker.play();
  }

  // Événement de clic sur l'oiseau
  document.getElementById("bird").addEventListener("click", handleBirdClick);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let currentDirection = "";
  const zoneLeft = 100; // Adjuster les valeurs pour définir la zone
  const zoneTop = 100;
  const zoneRight = window.innerWidth - 100;
  const zoneBottom = window.innerHeight - 200;

  let lastTimestamp = performance.now(); //Valeurs start de l'intervalle
  let frameCount = 0; //Nombre de frame

  let isPaused = false; //Bool pour savoir si le jeu est en pause

  function updateFPS() {
    const elapsed = performance.now() - lastTimestamp; // Intervalle
    console.log(`Refresh fps every ${elapsed} milliseconds.`);
    const fps = (frameCount * 1000) / elapsed; //Calcule du nombre de frame en fonction du temps écoulé
    console.log(fps);
    fpsText.textContent = "FPS: " + fps.toFixed(2); //affichage des fps

    frameCount = 0; //Reset
    lastTimestamp = performance.now(); //Départ d'unp nouvelle intervalle
  }

  function getRandomDirection() {
    const directions = [
      "flying-right",
      "flying-top-right",
      "flying-bottom-right",
      "flying-left",
      "flying-top-left",
      "flying-bottom-left",
    ];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  function flyRandomDirection() {
    const newDirection = getRandomDirection();

    currentDirection = newDirection;
    bird.className = "bird " + currentDirection;
  }

  function moveBird(timestamp) {
    if (!isPaused) {
      const elapsed = timestamp - lastTimestamp;

      // Update FPS, change this value to fix interval
      if (elapsed >= 500) {
        updateFPS();
      }
      switch (currentDirection) {
        case "flying-right":
          x += 1;
          break;
        case "flying-top-right":
          x += 1;
          y -= 1;
          break;
        case "flying-bottom-right":
          x += 1;
          y += 1;
          break;
        case "flying-left":
          x -= 1;
          break;
        case "flying-top-left":
          x -= 1;
          y -= 1;
          break;
        case "flying-bottom-left":
          x -= 1;
          y += 1;
          break;
      }

      frameCount++;

      let count = 0;

      // Check if the bird is within the specified zone
      if (x < zoneLeft || x > zoneRight || y < zoneTop || y > zoneBottom) {
        count += 1;
        // Reset bird position to the center and choose a new direction
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
        flyRandomDirection();
      } else {
        bird.style.left = x + "px";
        bird.style.top = y + "px";
      }

      if (count >= 5) {
        alert("Game Over! Your score: " + score);
      }

      // Update the visual representation of the zone
      zone.style.left = zoneLeft + "px";
      zone.style.top = zoneTop + "px";
      zone.style.width = zoneRight - zoneLeft + "px";
      zone.style.height = zoneBottom - zoneTop + "px";

      requestAnimationFrame(moveBird);
    } else {
      // If paused, simply request the next animation frame without updating anything
      requestAnimationFrame(moveBird);
    }
  }

  function toggleAnimationPause() {
    const bird = document.querySelector(".bird");
    const clouds = document.querySelector(".clouds");
    const clouds2 = document.querySelector(".clouds2");

    // Ajoute ou retire la classe "paused" en fonction de l'état de pause
    bird.classList.toggle("paused", isPaused);
    clouds.classList.toggle("paused", isPaused);
    clouds2.classList.toggle("paused", isPaused);
    background.classList.toggle("paused", isPaused);
  }

  // Function to toggle pause
  function togglePause() {
    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? "block" : "none";

    // If unpaused, reset the last timestamp
    if (!isPaused) {
      lastTimestamp = performance.now();
    }

    toggleAnimationPause();
  }

  // Event listener for the 'P' key to toggle pause
  document.addEventListener("keydown", function (event) {
    if (event.key === "p" || event.key === "P") {
      togglePause();
    }
  });

  flyRandomDirection();
  setInterval(function () {
    if (!isPaused) {
      flyRandomDirection();
    }
  }, 1000); // Change direction every 10 seconds
  requestAnimationFrame(moveBird);

  // Remove other bird divs
  const otherBirds = document.querySelectorAll(".bird:not(#bird)");
  otherBirds.forEach((otherBird) => otherBird.remove());
});
