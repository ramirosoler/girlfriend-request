const movableDiv = document.getElementById('movable-div');
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const moveUpButton = document.getElementById('move-up');
const moveDownButton = document.getElementById('move-down');
const errorMessage = document.getElementById('error-message');
const point = document.getElementById('point');
const text = document.getElementById("score");
const lastPoint = document.getElementById("last_point")
const buttons = document.getElementById("buttons");
const message = document.getElementById("message");

var score = 0;
let currentX = 150;
let currentY = 250;

const divWidth = movableDiv.clientWidth;
const divHeight = movableDiv.clientHeight;
const maxX = window.innerWidth - divWidth;
const maxY = window.innerHeight - divHeight;


// Puntaje

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
  
function loadPoint(x, y){
    point.style.left = x + 'px';
    point.style.top = y + 'px';

    if(score === 5){
        point.style.display = 'none';
        lastPoint.style.display = 'block';
    }

}

function lastPointFn(){
buttons.style.display = 'none';
movableDiv.style.display = 'none';
text.style.display = 'none';
point.style.display = 'none';
lastPoint.style.display = 'none';
message.style.display = 'block';
}

function addPoint(){
    score++;
    text.innerText = "Puntaje: " + score;
}

// window.addEventListener('load', () => lastPointFn());
window.addEventListener('load', () => loadPoint(getRandomInt(1,251), getRandomInt(1, 501)));

// Movimiento

function moveDiv(direction) {
    let newX = currentX;
    let newY = currentY;

    switch (direction) {
        case 'left':
            newX = Math.max(currentX - 50, 0);
            break;
        case 'right':
            newX = Math.min(currentX + 50, maxX);
            break;
        case 'up':
            newY = Math.max(currentY - 50, 0);
            break;
        case 'down':
            newY = Math.min(currentY + 50, maxY);
            break;
        default:
            break;
    }



    if (newX === currentX && newY === currentY) {
        // Colisión detectada

        errorMessage.style.display = 'block';
        movableDiv.style.left = 110 + 'px';
        movableDiv.style.top = 230 + 'px';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2000);
    } else {



        movableDiv.style.left = newX + 'px';
        movableDiv.style.top = newY + 'px';
        currentX = newX;
        currentY = newY;

        let player = movableDiv.getBoundingClientRect();
        let p1 = point.getBoundingClientRect();
        let p2 = lastPoint.getBoundingClientRect();
        if (
            player.right >= p1.left &&
            player.left <= p1.right &&
            player.bottom >= p1.top &&
            player.top <= p1.bottom
        ) {
            loadPoint(getRandomInt(1,251), getRandomInt(1, 201));
            addPoint();
        }
        
        if (
            player.right >= p2.left &&
            player.left <= p2.right &&
            player.bottom >= p2.top &&
            player.top <= p2.bottom
        ) {
            lastPointFn();
        }

    }
}

moveLeftButton.addEventListener('click', () => moveDiv('left'));
moveRightButton.addEventListener('click', () => moveDiv('right'));
moveUpButton.addEventListener('click', () => moveDiv('up'));
moveDownButton.addEventListener('click', () => moveDiv('down'));
