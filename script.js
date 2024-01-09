////////////recup divs//////////////
const menu = document.getElementById('menu')
const grass = document.querySelector('.grass');
const dog = document.querySelector('.dog')
////////////recup divs//////////////

//////////////menu//////////////////
function startGame() {
  // Start moving ducks at regular intervals
  nightModeBtn.style.opacity = 0
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
    speed -= 10
    duckStartHeight -= 200
    console.log('next speed: ' + speed)
  } else if (speed > 10 && speed <= 30) {
    speed -= 5
    duckStartHeight -= 200
    console.log('next speed: ' + speed)
  } else {
    console.log('You are max speed')
  }
  

  setTimeout(() => {
    failed();
  }, 11000);



}

function menuDisapearInGame() { //fait disparaitre le menu quand on clique sur start
  console.log('menu disapear')
  menu.style.opacity = 0
  grass.classList.toggle('paused');

  setTimeout(() => {
    menu.style.zIndex = -999;
  }, 500);
}

function showCredits() {
  console.log('Artworks : Enzo')
  console.log('Front-End : Enzo')
  console.log('Back-End : Enzo ft. Chat-Gpt')
}


//////////////game//////////////////

// a faire :
///if je touche au moins un canard la vitesse augmente
// relancer la partie automatiquement
// ecran fail
// skins ???

const failScreen = document.getElementById('fail-screen')

const nightModeBtn = document.querySelector('.night-mode-btn')

const gameContainer = document.getElementById('game-container');
let duckCount = 0;
const ducks = [];

let i = 0;
var maxDuck = 15;
var duckStartHeight = 3000

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
const timer = document.querySelector('.timer')
const timediv = document.querySelector('.timediv')


const score = document.querySelector('.score')

const divBg = document.querySelector('.divbackground')

let lastScore = 0



window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});


function getRandomValue() {
  randomValues = [];
  const currentTime = Date.now() - startTime;
  ducks.forEach(() => {
    const leftOrRightValue = Math.floor(Math.random() * 3);
    const upOrDownValue = currentTime < (duckStartHeight + 1000) ? 2 : Math.floor(Math.random() * 3);
    randomValues.push({ leftOrRightValue, upOrDownValue });
  });
}


function isBlackBlueOrRed() {
  if (blueCount > 0 && Math.random() < 0.05) {
    blueCount--;
    return 'blue';
  } else if (redCount > 0 && Math.random() < 0.1) {
    redCount--;
    return 'red';
  } else {
    return 'black';
  }
}


function createDuck(id, initialX, initialY) {
  const duck = document.createElement('div');
  duck.id = `duck${id}`;
  duck.classList.add('bird');
  duck.style.left = `${initialX}px`;
  duck.style.top = `${initialY}px`;

  const color = isBlackBlueOrRed();

  if (color === 'red') {
    duck.classList.add('red');
  } else if (color === 'blue') {
    duck.classList.add('blue');
  }



  let alreadyDead = false

  duck.addEventListener('click', function () {
    console.log(deadDucks, lastScore)
    if (!alreadyDead) {
      alreadyDead = true;
      duck.classList.add('dead')
      if (duck.classList.contains('red')) {
        deadDucks += 2
      }
      if (duck.classList.contains('blue')) {
        deadDucks += 5
      } else {
        deadDucks += 1
      }

      score.textContent = `${deadDucks}`


      if (deadDucks % 2 === 0) {
        const counterDog = document.createElement('div');
        counterDog.classList.add('counter-dog');
        counterDog.classList.add('double-duck');
        counterDog.style.left = `${initialX}px`;
        divBg.appendChild(counterDog);
        setTimeout(() => {
          divBg.removeChild(counterDog);
        }, 4000);
      }

      if (deadDucks % 2 !== 0 && gameContainer.classList.contains('end')) {
        const counterDog = document.createElement('div');
        counterDog.classList.add('counter-dog');
        counterDog.classList.add('one-duck');
        counterDog.style.left = `${initialX}px`;
        divBg.appendChild(counterDog);
        setTimeout(() => {
          divBg.removeChild(counterDog);
        }, 4000);
      }

      setTimeout(() => {
        console.log('removed')
        removeDuck(duck);
      }, 2000)

    }

  });

  gameContainer.appendChild(duck);
  ducks.push(duck);
  lastScore = deadDucks
}

function removeDuck(duck) {
  duck.remove();
  const index = ducks.indexOf(duck);
  if (index !== -1) {
    ducks.splice(index, 1);
  }
}

function startCreatingDucks() {
  createDuck(i, Math.floor(Math.random() * gameContainer.offsetWidth), gameContainer.offsetHeight);
  setInterval(getRandomValue());
  i++;
  if (i < maxDuck) {
    console.log('created duck')
    setTimeout(startCreatingDucks, 100);
    console.log(i)
  }
  if (i === maxDuck - 1) {
    setTimeout(() => {
      i = 0
    }, 10000);
  }
}


function moveDuck(ducks) {
  console.log('moved')
  ducks.forEach((duck, index) => {
    /*     const maxX = gameContainer.offsetWidth - duckWidth;
    const maxY = gameContainer.offsetHeight - duckHeight; */

    let newX = parseInt(duck.style.left);
    let newY = parseInt(duck.style.top);

    if (gameContainer.classList.contains('invincible')) {
      //a 0 seconde on peu plus cliquer sur les canards
      duck.style.pointerEvents = 'none'
      setTimeout(() => {
        // les rend clicable a nouveau
        duck.style.pointerEvents = 'auto'
      }, 4000);
    }

    let { leftOrRightValue, upOrDownValue } = randomValues[index];
    if (duck.classList.contains('dead')) {
      newX += 0
      newY += 0
    } else if (gameContainer.classList.contains('end')) {
      upOrDownValue = 2;
      if (leftOrRightValue === 0) {
        newX = Math.max(newX - distance, /* 0 */);
      } else if (leftOrRightValue === 2) {
        newX = Math.min(newX + distance, /* maxX */);
      }
      if (upOrDownValue === 0) {
        newY = Math.min(newY + distance,/*  maxY  */);
      } else if (upOrDownValue === 2) {
        newY = Math.max(newY - distance, /* 0 */);
      }
      if (leftOrRightValue === 1 && upOrDownValue === 1) {
        newY -= 5;
        newX += 10;
      }
    }
    else {
      if (leftOrRightValue === 0) {
        newX = Math.max(newX - distance, /* 0 */);
      } else if (leftOrRightValue === 2) {
        newX = Math.min(newX + distance, /* maxX */);
      }
      if (upOrDownValue === 0) {
        newY = Math.min(newY + distance,/*  maxY  */);
      } else if (upOrDownValue === 2) {
        newY = Math.max(newY - distance, /* 0 */);
      }
      if (leftOrRightValue === 1 && upOrDownValue === 1) {
        newY -= 5;
        newX += 10;
      }
    }

    const transformations = {
      '1-2': ['flying-top', `scaleY(1) rotate(0deg)`],//top
      '1-0': ['flying-top', `scaleY(-1) rotate(0deg)`],//bottom
      '2-1': ['flying-right', `scaleY(1) rotate(0deg)`],//right
      '0-1': ['flying-right', `scaleX(-1) rotate(0deg)`],//left
      '2-2': ['flying-top-right', `scaleY(1) rotate(0deg)`],//top-right
      '0-2': ['flying-top-right', `scaleX(-1) rotate(0deg)`],//top-left
      '2-0': ['flying-top-right', `scale(1) rotate(90deg)`],//bottom-right
      '0-0': ['flying-top-right', `scaleX(-1) rotate(90deg)`],//bottom-left
      '1-1': ['flying-right', `scaleY(1) rotate(0deg)`]
    };

    const key = `${leftOrRightValue}-${upOrDownValue}`;
    if (transformations[key]) {
      const [className, transformValue] = transformations[key];
      duck.classList.remove('flying-top', 'flying-top-right', 'flying-right');
      if (!duck.classList.contains('dead')) {
        duck.classList.add(className);
        duck.style.transform = transformValue;
      } else {
        duck.style.transform = `scaleY(1) rotate(0deg)`
      }
    }

    duck.style.left = newX + 'px';
    duck.style.top = newY + 'px';
  });

}




function timerShowUp() {
  let time = seconde;

  // Clear any existing interval
  clearInterval(countdown);

  // Show the timer
  timediv.style.translate = '-152px -150px';

  // Format the timer as 00:00
  countdown = setInterval(function () {
    let minutes = Math.floor(time / 60);
    let remainingtime = time % 60;
    let formattedTime =
      (minutes < 10 ? '0' : '') + minutes + ':' +
      (remainingtime < 10 ? '0' : '') + remainingtime;
    timer.textContent = formattedTime;

    if (time <= 2) {
      gameContainer.classList.add('end');
      setTimeout(() => {
        gameContainer.classList.remove('end');
        while (gameContainer.firstChild) {
          gameContainer.removeChild(gameContainer.firstChild);
        }
      }, 8000);
    }

    if (time <= 0) {
      gameContainer.classList.add('invincible');
      gameContainer.classList.add('oneduck?');

      dog.style.translate = '0px -140px';
      dog.style.opacity = '1';
      setTimeout(() => {
        gameContainer.classList.remove('invincible');
        console.log('operationel pour une deuxieme game');
        timer.textContent = `00:${seconde}`;
        startGame();
      }, 8000);

      clearInterval(countdown);

      setTimeout(() => {
        // Restart the background
        grass.classList.toggle('paused');
        gameContainer.classList.remove('oneduck?');
      }, 1000);

      // Hide the timer
      timediv.style.translate = '-152px 0px';
    }

    time--;
  }, 1000);
}

function menuDisapearInGame() {
  console.log('menu disapear');
  menu.style.opacity = 0;
  grass.classList.toggle('paused');

  setTimeout(() => {
    menu.style.zIndex = -999;
  }, 500);
}


function dogAnimation() {
  dog.classList.replace('snif', 'find')
  setTimeout(() => {
    dog.classList.replace('find', 'snif')
    dog.style.opacity = '0'
    dog.style.translate = '-100px -140px'
  }, 1000);
  if (gameContainer.classList.contains('end')) {
  }

}

lastDeadDucks = 0

function failed() {
  lastDeadDucks = deadDucks
  console.log('Checking deadDucks after 5 seconds:', deadDucks);
  console.log(lastDeadDucks, deadDucks)
  if (lastScore === deadDucks) {
    failScreen.style.zIndex = 999
    console.log('failed')
  }
  nightModeBtn.style.opacity = 1



}

let nightMode = false;
const moon = document.querySelector('.moon')
const cloudBtn = document.querySelector('.cloud-btn')

nightModeBtn.addEventListener('click', function () {
  if (nightMode === false) {
    cloudBtn.style.transform = 'translateX(10px)'
    cloudBtn.style.opacity = '0'
    moon.style.left = '22px'
    moon.style.backgroundColor = 'rgb(220, 215, 215)'
    nightModeBtn.style.backgroundColor = '#001f54';
    nightMode = true;
    console.log('Night Mode activated');
  } else {
    cloudBtn.style.transform = 'translateX(0px)'
    cloudBtn.style.opacity = '1'
    moon.style.left = '1px'
    nightModeBtn.style.backgroundColor = '#0cecfc';
    moon.style.backgroundColor = '#ffd60a'


    nightMode = false;
    console.log('Night Mode desactivated');

  }
});