////////////recup divs//////////////
const menu = document.getElementById("menu");
const grass = document.querySelector(".grass");
const dog = document.querySelector(".dog");
const silencedSound = new Audio("media/music/silenced.mp3");
const hitmarkerSound = new Audio("media/music/hitmarker.wav");
const quackSound = new Audio("media/music/quack.mp3");

////////////recup divs//////////////

//////////////menu//////////////////
function startGame() {
  // Start moving ducks at regular intervals
  nightModeBtn.style.opacity = 0;
  const moveDucksInterval = setInterval(function () {
    moveDuck(ducks);
  }, speed);
  setTimeout(() => {
    clearInterval(moveDucksInterval);
  }, 15000);

  startTime = Date.now();
  menuDisapearInGame();
  timerShowUp();
  dogAnimation();
  setTimeout(() => {
    startCreatingDucks();
    setInterval(getRandomValue, 1000);
  }, 1000);
  if (speed > 30) {
    speed -= 10;
    duckStartHeight -= 200;
    console.log("next speed: " + speed);
  } else if (speed > 10 && speed <= 30) {
    speed -= 5;
    duckStartHeight -= 200;
    console.log("next speed: " + speed);
  } else {
    console.log("You are max speed");
  }

  setTimeout(() => {
    failed();
  }, 11000);
}

function menuDisapearInGame() {
  //fait disparaitre le menu quand on clique sur start
  console.log("menu disapear");
  menu.style.opacity = 0;
  grass.classList.toggle("paused");

  setTimeout(() => {
    menu.style.zIndex = -999;
  }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  const music = document.getElementById('music');
  const volumeSlider = document.getElementById('volumeSlider');
  const sfxSlider = document.getElementById('sfxSlider');


  volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    music.volume = volume;
  });

  sfxSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    silencedSound.volume = volume;
    hitmarkerSound.volume = volume;
    quackSound.volume = volume;
  });
});

function showSettings() {
  const openSettingsDiv = document.querySelector('.openSettings');
  openSettingsDiv.classList.toggle('active');
};



//////////////game//////////////////

const failScreen = document.getElementById("fail-screen");

const nightModeBtn = document.querySelector(".night-mode-btn");

const gameContainer = document.getElementById("game-container");
let duckCount = 0;
const ducks = [];

let i = 0;
var maxDuck = 15;
var duckStartHeight = 3000;

var distance = 16;
var speed = 100;

const duckWidth = 66;
const duckHeight = 66;

let deadDucks = 0;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

let randomValues = [];

let blueCount = 1;
let redCount = 2;

let countdown;
let seconde = 10;
const timer = document.querySelector(".timer");
const timediv = document.querySelector(".timediv");

const score = document.querySelector(".score");

const divBg = document.querySelector(".divbackground");

let lastScore = 0;

window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});

function getRandomValue() {
  randomValues = [];
  const currentTime = Date.now() - startTime;
  ducks.forEach(() => {
    const leftOrRightValue = Math.floor(Math.random() * 3);
    const upOrDownValue =
      currentTime < duckStartHeight + 1000 ? 2 : Math.floor(Math.random() * 3);
    randomValues.push({ leftOrRightValue, upOrDownValue });
  });
}

function isBlackBlueOrRed() {
  if (blueCount > 0 && Math.random() < 0.05) {
    blueCount--;
    return "blue";
  } else if (redCount > 0 && Math.random() < 0.1) {
    redCount--;
    return "red";
  } else {
    return "black";
  }
}

function createDuck(id, initialX, initialY) {
  const duck = document.createElement("div");
  duck.id = `duck${id}`;
  duck.classList.add("bird");
  duck.style.left = `${initialX}px`;
  duck.style.top = `${initialY}px`;

  const color = isBlackBlueOrRed();

  if (color === "red") {
    duck.classList.add("red");
  } else if (color === "blue") {
    duck.classList.add("blue");
  }

  let alreadyDead = false;

  document.addEventListener("click", function () {
    silencedSound.currentTime = 0;
    silencedSound.play();
  });

  duck.addEventListener("click", function () {
/*     setTimeout(() => {
      silencedSound.volume = 1;
    }, 50);
    silencedSound.volume = 0.5;
 */
    console.log(deadDucks, lastScore);
    if (!alreadyDead) {
      alreadyDead = true;
      hitmarkerSound.play();
      quackSound.currentTime = 0;
      quackSound.play();
      duck.classList.add("dead");
      if (duck.classList.contains("red")) {
        deadDucks += 2;
      }
      if (duck.classList.contains("blue")) {
        deadDucks += 5;
      } else {
        deadDucks += 1;
      }

      score.textContent = `${deadDucks}`;

      if (deadDucks % 2 === 0) {
        const counterDog = document.createElement("div");
        counterDog.classList.add("counter-dog");
        counterDog.classList.add("double-duck");
        counterDog.style.pointerEvents = "auto";
        counterDog.style.left = `${initialX}px`;
        divBg.appendChild(counterDog);
        setTimeout(() => {
          divBg.removeChild(counterDog);
        }, 4000);
        counterDog.addEventListener("click", function () {
          counterDog.classList.remove("double-duck");
          counterDog.classList.add("dead-dog");
          console.log("feur");
          killedDog();
        });
      }

      if (deadDucks % 2 !== 0 && gameContainer.classList.contains("end")) {
        const counterDog = document.createElement("div");
        counterDog.classList.add("counter-dog");
        counterDog.classList.add("one-duck");
        counterDog.style.pointerEvents = "auto";
        counterDog.style.left = `${initialX}px`;
        divBg.appendChild(counterDog);
        setTimeout(() => {
          divBg.removeChild(counterDog);
        }, 4000);

        counterDog.addEventListener("click", function () {
          killedDog();
        });
      }

      setTimeout(() => {
        console.log("removed");
        removeDuck(duck);
      }, 2000);
    }
  });

  gameContainer.appendChild(duck);
  ducks.push(duck);
  lastScore = deadDucks;
}

function removeDuck(duck) {
  duck.remove();
  const index = ducks.indexOf(duck);
  if (index !== -1) {
    ducks.splice(index, 1);
  }
}

function startCreatingDucks() {
  createDuck(
    i,
    Math.floor(Math.random() * gameContainer.offsetWidth),
    gameContainer.offsetHeight
  );
  setInterval(getRandomValue());
  i++;
  if (i < maxDuck) {
    console.log("created duck");
    setTimeout(startCreatingDucks, 100);
    console.log(i);
  }
  if (i === maxDuck - 1) {
    setTimeout(() => {
      i = 0;
    }, 10000);
  }
}

function moveDuck(ducks) {
  console.log("moved");
  ducks.forEach((duck, index) => {
    /*     const maxX = gameContainer.offsetWidth - duckWidth;
    const maxY = gameContainer.offsetHeight - duckHeight; */

    let newX = parseInt(duck.style.left);
    let newY = parseInt(duck.style.top);

    if (gameContainer.classList.contains("invincible")) {
      //a 0 seconde on peu plus cliquer sur les canards
      duck.style.pointerEvents = "none";
      setTimeout(() => {
        // les rend clicable a nouveau
        duck.style.pointerEvents = "auto";
      }, 4000);
    }

    let { leftOrRightValue, upOrDownValue } = randomValues[index];
    if (duck.classList.contains("dead")) {
      newX += 0;
      newY += 0;
    } else if (gameContainer.classList.contains("end")) {
      upOrDownValue = 2;
      if (leftOrRightValue === 0) {
        newX = Math.max(newX - distance /* 0 */);
      } else if (leftOrRightValue === 2) {
        newX = Math.min(newX + distance /* maxX */);
      }
      if (upOrDownValue === 0) {
        newY = Math.min(newY + distance /*  maxY  */);
      } else if (upOrDownValue === 2) {
        newY = Math.max(newY - distance /* 0 */);
      }
      if (leftOrRightValue === 1 && upOrDownValue === 1) {
        newY -= 5;
        newX += 10;
      }
    } else {
      if (leftOrRightValue === 0) {
        newX = Math.max(newX - distance /* 0 */);
      } else if (leftOrRightValue === 2) {
        newX = Math.min(newX + distance /* maxX */);
      }
      if (upOrDownValue === 0) {
        newY = Math.min(newY + distance /*  maxY  */);
      } else if (upOrDownValue === 2) {
        newY = Math.max(newY - distance /* 0 */);
      }
      if (leftOrRightValue === 1 && upOrDownValue === 1) {
        newY -= 5;
        newX += 10;
      }
    }

    const transformations = {
      "1-2": ["flying-top", `scaleY(1) rotate(0deg)`], //top
      "1-0": ["flying-top", `scaleY(-1) rotate(0deg)`], //bottom
      "2-1": ["flying-right", `scaleY(1) rotate(0deg)`], //right
      "0-1": ["flying-right", `scaleX(-1) rotate(0deg)`], //left
      "2-2": ["flying-top-right", `scaleY(1) rotate(0deg)`], //top-right
      "0-2": ["flying-top-right", `scaleX(-1) rotate(0deg)`], //top-left
      "2-0": ["flying-top-right", `scale(1) rotate(90deg)`], //bottom-right
      "0-0": ["flying-top-right", `scaleX(-1) rotate(90deg)`], //bottom-left
      "1-1": ["flying-right", `scaleY(1) rotate(0deg)`],
    };

    const key = `${leftOrRightValue}-${upOrDownValue}`;
    if (transformations[key]) {
      const [className, transformValue] = transformations[key];
      duck.classList.remove("flying-top", "flying-top-right", "flying-right");
      if (!duck.classList.contains("dead")) {
        duck.classList.add(className);
        duck.style.transform = transformValue;
      } else {
        duck.style.transform = `scaleY(1) rotate(0deg)`;
      }
    }

    duck.style.left = newX + "px";
    duck.style.top = newY + "px";
  });
}

function timerShowUp() {
  let time = seconde;

  // Clear any existing interval
  clearInterval(countdown);

  // Show the timer
  timediv.style.translate = "-152px -150px";

  // Format the timer as 00:00
  countdown = setInterval(function () {
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
        startGame();
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
  }, 1000);
}

function menuDisapearInGame() {
  console.log("menu disapear");
  menu.style.opacity = 0;
  grass.classList.toggle("paused");

  setTimeout(() => {
    menu.style.zIndex = -999;
  }, 500);
}

function dogAnimation() {
  dog.classList.replace("snif", "find");
  setTimeout(() => {
    dog.classList.replace("find", "snif");
    dog.style.opacity = "0";
    dog.style.translate = "-100px -140px";
  }, 1000);
  if (gameContainer.classList.contains("end")) {
  }
}

lastDeadDucks = 0;

function failed() {
  lastDeadDucks = deadDucks;

  if (lastScore === deadDucks) {
    failScreen.style.zIndex = 999;
    nightModeBtn.style.opacity = 1;
    envApi();
  }

  function envApi() {
    const playerName = prompt("Entrez votre nom d'utilisateur:");
    const playerData = {
      username: playerName,
      score: deadDucks,
    };

    console.log(playerData);

    fetch("http://127.0.0.1:8080/addscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données:", error);
      });
  }
}

function showRanking() {
  fetch('http://127.0.0.1:8080/getscoreboard', {
  method: 'GET', 
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateRankingHTML(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function updateRankingHTML(rankingData) {
  var rankingContainer = document.getElementById('rankingContainer');

  // Clear previous content in the container
  rankingContainer.innerHTML = '';

  // Create and append elements to display ranking
  var heading = document.createElement('h2');
  heading.textContent = 'Ranking';

  var list = document.createElement('ul');

  for (var i = 0; i < Math.min(10, rankingData.length); i++) {
    var listItem = document.createElement('li');
    listItem.textContent = `${i + 1}. ${rankingData[i].username} - Score: ${rankingData[i].score}`;
    list.appendChild(listItem);
}

  rankingContainer.appendChild(heading);
  rankingContainer.appendChild(list);
}


/* Night Mode */
let nightMode = false;
const moon = document.querySelector(".moon");
const cloudBtn = document.querySelector(".cloud-btn");
const stbtn = document.querySelector(".startBtn");
const sbtn = document.querySelector(".settingsBtn");
const dbtn = document.querySelector(".difficultyBtn");
const rbtn = document.querySelector(".rankingBtn");

let lastClickTime = 0;

nightModeBtn.addEventListener("click", function () {
  const currentTime = new Date().getTime();

  if (currentTime - lastClickTime < 1000) {
    console.log("Wait for 1 second before clicking again");
    return;
  }

  lastClickTime = currentTime;
  const logo = document.getElementById("logo");
  if (nightMode === false) {
    cloudBtn.style.transform = "translateX(10px)";
    cloudBtn.style.opacity = "0";
    moon.style.left = "22px";
    moon.style.backgroundColor = "rgb(220, 215, 215)";
    nightModeBtn.style.backgroundColor = "#001f54";
    document.body.classList.add("dark-mode"); // Ajoutez une classe au body pour le mode sombre
    menu.classList.add("flip");
    /*     stbtn.classList.add('flipbtn')
        sbtn.classList.add('flipbtn')
        dbtn.classList.add('flipbtn')
        rbtn.classList.add('flipbtn') */
    setTimeout(() => {
      stbtn.style.backgroundColor = "#6b387e";
      sbtn.style.backgroundColor = "#6b387e";
      dbtn.style.backgroundColor = "#6b387e";
      rbtn.style.backgroundColor = "#6b387e";

      logo.src = "media/logo_dark.png"; // Changez la source de l'image pour le mode sombre
    }, 500);
    setTimeout(() => {
      menu.classList.remove("flip");
      /*       stbtn.classList.remove('flipbtn')
      sbtn.classList.remove('flipbtn')
      dbtn.classList.remove('flipbtn')
      rbtn.classList.remove('flipbtn') */
    }, 1000);
    console.log("Night Mode activated");
    nightMode = true;
  } else {
    cloudBtn.style.transform = "translateX(0px)";
    cloudBtn.style.opacity = "1";
    moon.style.left = "1px";
    nightModeBtn.style.backgroundColor = "#0cecfc";
    moon.style.backgroundColor = "#ffd60a";
    menu.classList.add("flip");
    document.body.classList.remove("dark-mode"); // Retirez la classe pour le mode sombre

    setTimeout(() => {
      stbtn.style.backgroundColor = "#4caf50";
      sbtn.style.backgroundColor = "#4caf50";
      dbtn.style.backgroundColor = "#4caf50";
      rbtn.style.backgroundColor = "#4caf50";
      logo.src = "media/logo.ico"; // Changez la source de l'image pour le mode sombre
    }, 500);
    setTimeout(() => {
      menu.classList.remove("flip");
    }, 1000);
    console.log("Night Mode desactivated");
    nightMode = false;
  }
});

const music = document.getElementById("music");


function killedDog() {
  failScreen.classList.add("failed");
  const killSound = new Audio("media/music/ftnkill.mp3");
  failScreen.style.zIndex = 999;
  killSound.play();
  music.pause();
}

/////autoplaymusic/////
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function () {
    if (music.paused && !failScreen.classList.contains("failed")) {
      music.play();
    }
  });
});





/* Menu Difficulty */
// Ajoutez cet événement à votre script
document
  .getElementById("difficulty-slider")
  .addEventListener("input", updateDifficultyLabel);
  const difficultyDiv = document.querySelector(".difficulty");
  
/* function showDifficulty() {
  difficultyDiv.style.display = "block";
}

function applyDifficulty() {
  // Cacher la div "difficulty" après l'application de la difficulté (à ajuster selon vos besoins)
  const difficultyDiv = document.querySelector(".difficulty");
}
 */
const openDifficulty = document.querySelector('.openDifficulty')

function setDifficulty() {
  openDifficulty.classList.toggle('active');
/*   applyDifficulty() */
}

// Définissez la fonction updateDifficultyLabel
function updateDifficultyLabel() {
  const difficultySlider = document.getElementById("difficulty-slider");
  const difficultyLabel = document.getElementById("difficulty-label");
  const speedLabel = document.getElementById("speed-label");
  const difficultyValue = parseInt(difficultySlider.value);
  switch (difficultyValue) {
    case 1:
      difficultyLabel.textContent = "Easy";
      speedLabel.textContent = "Speed: slow";
      speed = 100;
      break;
    case 2:
      difficultyLabel.textContent = "Medium";
      speedLabel.textContent = "Speed: medium";
      speed = 75;
      break;
    case 3:
      difficultyLabel.textContent = "Hard";
      speedLabel.textContent = "Speed: fast";
      speed = 50;
      break;
    case 4:
      difficultyLabel.textContent = "Extreme";
      speedLabel.textContent = "Gonna be Hard";
      break;
    default:
      difficultyLabel.textContent = "Easy";
      speedLabel.textContent = "Speed: 100";
      speed = 100;
      break;
  }
}