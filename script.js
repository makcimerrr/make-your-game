// defini les variables de mouvement haut, bas, gauche et droite
let leftOrRightValue
let upOrDownValue
//defini le spawn du duck
let newX = 500
let newY = 500
//defini la div du duck
const duck = document.getElementById('duck')


//function pour avoir un random une valeur entre 0 et 1
function leftOrRight() {
  leftOrRightValue = Math.round(Math.random());
  //console.log(leftOrRight);
  return leftOrRightValue;
}
function upOrDown() {
  upOrDownValue = Math.round(Math.random());
  //console.log(leftOrRight);
  return upOrDownValue;
}

moveDuck(leftOrRight(), upOrDown());

setInterval(leftOrRight, 1000);
setInterval(upOrDown, 1000);

function moveDuck(leftOrRightValue, upOrDownValue) {
  console.log(leftOrRightValue, upOrDownValue);
  if (leftOrRightValue === 0) {
    newX = newX + 10
  } else {
    newX = newX - 10
  }
  if (upOrDownValue === 0) {
    newY = newY + 10
  } else {
    newY = newY - 10
  }

  if (leftOrRightValue === 0 && upOrDownValue === 0 ) {
console.log('miaou')
  }

  duck.style.transform = `translate(${newX}px,${newY}px)`
}

setInterval(function () {
  moveDuck(leftOrRightValue, upOrDownValue);
}, 60);
