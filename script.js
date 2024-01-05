
const gameContainer = document.getElementById('game-container');
let duckCount = 0;
const ducks = [];

let i = 0;
var maxDuck = 16;
var duckStartHeight = 2000

var distance = 16;
var speed = 70;

const duckWidth = 66;
const duckHeight = 66;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});

let randomValues = [];

startTime = Date.now();
function getRandomValue() {
  randomValues = [];
  const currentTime = Date.now() - startTime;
  ducks.forEach(() => {
    const leftOrRightValue = Math.floor(Math.random() * 3);
    const upOrDownValue = currentTime < duckStartHeight ? 2 : Math.floor(Math.random() * 3);
    
    randomValues.push({ leftOrRightValue, upOrDownValue });
  });
  console.log(randomValues);
}

function isBlackBlueOrRed() {
  const colors = ['black', 'blue', 'red'];
  const randomIndex = Math.floor(Math.random() * 3);
  return colors[randomIndex];
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

  gameContainer.appendChild(duck);
  ducks.push(duck);
}

function startCreatingDucks() {
  createDuck(i, Math.floor(Math.random() * gameContainer.offsetWidth), gameContainer.offsetHeight);
  setInterval(getRandomValue());
  i++;
  if (i < maxDuck) {
    setTimeout(startCreatingDucks,70);
  }
}
startCreatingDucks();

function moveDuck(ducks) {
  ducks.forEach((duck, index) => {
    const maxX = gameContainer.offsetWidth - duckWidth;
    const maxY = gameContainer.offsetHeight - duckHeight;

    let newX = parseInt(duck.style.left);
    let newY = parseInt(duck.style.top);

    const { leftOrRightValue, upOrDownValue } = randomValues[index];

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
      duck.classList.add(className);
      duck.style.transform = transformValue;
    }

    duck.style.left = newX + 'px';
    duck.style.top = newY + 'px';
  });
}

setInterval(function () {
  moveDuck(ducks);
}, speed);

setInterval(getRandomValue, 1000);
