// defini les variables de mouvement haut, bas, gauche et droite
let leftOrRightValue
let upOrDownValue
//defini le spawn du duck
let newX = 0
let newY = 0
//defini la div du duck
const duck = document.getElementById('bird')

//taille de l'ecran
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
//taille du duck
const duckWidth = 82.5;
const duckHeight = 82.5;

window.addEventListener('resize', function () {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});


//function pour avoir un random une valeur entre 0 et 1 et 2
function leftOrRight() {
  leftOrRightValue = Math.floor(Math.random() * 3);
  return leftOrRightValue;
}

function upOrDown() {
  upOrDownValue = Math.floor(Math.random() * 3);
  return upOrDownValue;
}

moveDuck(leftOrRight(), upOrDown());

setInterval(leftOrRight, 1000);
setInterval(upOrDown, 1000);


//375x267
function moveDuck(leftOrRightValue, upOrDownValue) {
  duck.classList.remove('flying-top', 'flying-top-right', 'flying-right');

  // Calculate the maximum X and Y values based on the game container size
  const maxX = document.getElementById('game-container').offsetWidth - duckWidth;
  const maxY = document.getElementById('game-container').offsetHeight - duckHeight;

  if (newX*4 <= 0) {
    leftOrRightValue = 2; // Set leftOrRightValue to 2 to move right
    console.log('limit left')
    newX = 0; // Reset newX to prevent the duck from going out of bounds
  } else if (newX >= maxX) {
    leftOrRightValue = 0; // Set leftOrRightValue to 0 to move left
    newX = maxX; // Reset newX to prevent the duck from going out of bounds
    console.log('limit right')
  }

  if (newY*4 <= 0) {
    upOrDownValue = 0; // Set upOrDownValue to 0 to move down
    console.log('limit top')
    newY = 0; // Reset newY to prevent the duck from going out of bounds
  } else if (newY >= maxY) {
    upOrDownValue = 2; // Set upOrDownValue to 2 to move up
    newY = maxY; // Reset newY to prevent the duck from going out of bounds
    console.log('limit bottom')
  }
  console.log(newX*4 - duckWidth, maxX)
  console.log(newY*4 + duckHeight, maxY)
  


  if (leftOrRightValue === 0) {
    newX = newX - 10
    console.log('left')
  } else if (leftOrRightValue === 2) {
    newX = newX + 10
    console.log('right')
  } else {
    newX = newX
  }


  if (upOrDownValue === 0) {
    console.log('bottom')
    newY = newY + 10
  } else if (upOrDownValue === 2) {
    console.log('top')
    newY = newY - 10
  } else {
    newY = newY
  }
  console.log(leftOrRightValue, upOrDownValue);

//pour le sur place
if (leftOrRightValue === 1 && upOrDownValue === 1) {
  
  duck.classList.add('flying-right')
  newY = newY - 5
  newX = newX + 10
}



  //top
  if (leftOrRightValue === 1 && upOrDownValue === 2) {
    duck.classList.add('flying-top')
    duck.style.transform = `translate(${newX}px,${newY}px)`
  }
  //bottom
  if (leftOrRightValue === 1 && upOrDownValue === 0) {
    duck.classList.add('flying-top')
    duck.style.transform = `translate(${newX}px,${newY}px) scaleY(-1)`
  }
  //right
  if (leftOrRightValue === 2 && upOrDownValue === 1) {
    duck.classList.add('flying-right')
    duck.style.transform = `translate(${newX}px,${newY}px)`
  }
  //left
  if (leftOrRightValue === 0 && upOrDownValue === 1) {
    duck.classList.add('flying-right')
    duck.style.transform = `translate(${newX}px,${newY}px) scaleX(-1)`
  }
  //top-right
  if (leftOrRightValue === 2 && upOrDownValue === 2) {
    duck.classList.add('flying-top-right')
    duck.style.transform = `translate(${newX}px,${newY}px)`
  }
  //top-left
  if (leftOrRightValue === 0 && upOrDownValue === 2) {
    duck.classList.add('flying-top-right')
    duck.style.transform = `translate(${newX}px,${newY}px) scaleX(-1)`
  }
  //bottom-right
  if (leftOrRightValue === 2 && upOrDownValue === 0) {
    duck.classList.add('flying-top-right')
    duck.style.transform = `translate(${newX}px,${newY}px) rotate(90deg)`
  }
  //bottom-left
  if (leftOrRightValue === 0 && upOrDownValue === 0) {
    duck.classList.add('flying-top-right')
    duck.style.transform = `translate(${newX}px,${newY}px) scaleX(-1) rotate(90deg)`
  }
  if (leftOrRightValue === 1 && upOrDownValue === 1) {
    duck.classList.add('flying-top')
    duck.style.transform = `translate(${newX}px,${newY}px)`
  }
}

setInterval(function () {
  moveDuck(leftOrRightValue, upOrDownValue);
}, 150);
