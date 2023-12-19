// defini les variables de mouvement haut, bas, gauche et droite
let leftOrRightValue
let upOrDownValue
//defini le spawn du duck
let newX = 100
let newY = 100
//defini la div du duck
const duck = document.getElementById('bird')


//function pour avoir un random une valeur entre 0 et 1 et 2
function leftOrRight() {
  leftOrRightValue = Math.floor(Math.random() * 3);
  //console.log(leftOrRightValue, 'leftOrRightValue');
  return leftOrRightValue;
}

function upOrDown() {
  upOrDownValue = Math.floor(Math.random() * 3);
  //console.log(upOrDownValue, 'upOrDownValue');
  return upOrDownValue;
}

moveDuck(leftOrRight(), upOrDown());

setInterval(leftOrRight, 1000);
setInterval(upOrDown, 1000);

function moveDuck(leftOrRightValue, upOrDownValue) {
  duck.classList.remove('flying-top-left', 'flying-left','flying-bottom-left','flying-top-right','flying-right','flying-bottom-right');
  console.log(leftOrRightValue, upOrDownValue);
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
    console.log('top')
    newY = newY - 10
  } else if (upOrDownValue === 2) {
    console.log('bottom')
    newY = newY + 10
  } else {
    newY = newY
  }
  
  if (leftOrRightValue === 0 && upOrDownValue === 0) {
    duck.classList.add('flying-top-left')
  }
  if (leftOrRightValue === 0 && upOrDownValue === 1) {
    duck.classList.add('flying-left')
  }
  if (leftOrRightValue === 0 && upOrDownValue === 2) {
    duck.classList.add('flying-bottom-left')
  }
  
  if (leftOrRightValue === 2 && upOrDownValue === 0) {
    duck.classList.add('flying-top-right')
  }
  if (leftOrRightValue === 2 && upOrDownValue === 1) {
    duck.classList.add('flying-right')
  }
  if (leftOrRightValue === 2 && upOrDownValue === 2) {
    duck.classList.add('flying-bottom-right')
  }
  duck.style.transform = `translate(${newX}px,${newY}px)`
}

setInterval(function () {
  moveDuck(leftOrRightValue, upOrDownValue);
}, 120);
