
//////////////menu//////////////////

////////////recup divs//////////////
const menu = document.getElementById('menu')
const grass = document.querySelector('.grass');
const dog = document.querySelector('.dog')
////////////recup divs//////////////


function startGame() {
  setInterval(function () {
    moveDuck(ducks);
  }, speed);
  startTime = Date.now();
  menuDisapearInGame()
dog.classList.replace('snif', 'find')
  setTimeout(() => {
    startCreatingDucks();
    setInterval(getRandomValue, 1000);
  },1000)
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

const gameContainer = document.getElementById('game-container');
let duckCount = 0;
const ducks = [];

let i = 0;
var maxDuck = 16;
var duckStartHeight = 2500

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

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});


function getRandomValue() {
  randomValues = [];
  const currentTime = Date.now() - startTime;
  ducks.forEach(() => {
    const leftOrRightValue = Math.floor(Math.random() * 3);
    const upOrDownValue = currentTime < (duckStartHeight+1000) ? 2 : Math.floor(Math.random() * 3);
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

  duck.addEventListener('click', function () {
    duck.classList.add('dead')

    deadDucks+=1
    console.log(deadDucks)


    if (deadDucks%2 === 0) {
      dog.classList.add('double-duck')
            console.log('double duck')
      setTimeout(() => {
        dog.classList.remove('double-duck')
      }, 4000);
    }
    
    if (deadDucks%1 === 0) {
      dog.classList.add('one-duck')
            console.log('one duck')
      setTimeout(() => {
        dog.classList.remove('one-duck')
      }, 4000);
    }

    setTimeout(() => {
      removeDuck(duck);
    },2000)
  });


  gameContainer.appendChild(duck);
  ducks.push(duck);
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
    setTimeout(startCreatingDucks, 100);
  }
}


function moveDuck(ducks) {
  ducks.forEach((duck, index) => {
    /*     const maxX = gameContainer.offsetWidth - duckWidth;
        const maxY = gameContainer.offsetHeight - duckHeight; */

    let newX = parseInt(duck.style.left);
    let newY = parseInt(duck.style.top);

    const { leftOrRightValue, upOrDownValue } = randomValues[index];
    if (duck.classList.contains('dead')) {
      newX += 0
      newY += 0
    } else {
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
      if(!duck.classList.contains('dead')) {
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

