const game = document.querySelector('#gameCanvas');
// canvas context:
const ctx = game.getContext('2d');

//  represent the snake as an array of coordinates:
let snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
    // (by default our snake 'll start whit 5 squares thanks this 5 coordinates)
];

let dx = 10; // start to right position
let dy = 0;
let score = 0; // Keeping track of the score
let foodX;
let foodY;
let changingDirection = false // Global variable to prevent multiple inputs

// canvas styles: 
game.style.backgroundColor = '#D5E5D5';
game.style.border = '2px solid #ADB2D4';

// we need a function to draw different parts of the "snake's body"
function drawSnakeParts(snakeBody) {
    ctx.fillStyle = '#1F7D53'; // fill color
    ctx.strokeStyle = '#18230F'; // border color
    // fillRect and strokeRect are the default properities for drawing a rectangle. 
    ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
    ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
}

// we'll use ForEach loop, for prints the parts of the canvas
function drawSnakeOnScreen() {
    snake.forEach(drawSnakeParts);
}

// new fuction for update the snake
function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
}

function clearCanvas() {
    ctx.fillStyle = '#D5E5D5';
    ctx.strokeStyle = '#ADB2D4';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function main() {
    if (didGameEnd()) return;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnakeOnScreen();
        main();
    }, 100);
}

// changing the snake's direction when arrows keys is pressed
function changeDirection(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return; // Add control here
    changingDirection = true;

    const keyPressed = e.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -10; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 10; }
    
    // Resets changingDirection after a short delay
    setTimeout(() => {
        changingDirection = false;
    }, 100);
}

// To connect changeDirection to our game, we can use addEventListener on the document to ‘listen’ for when a key is pressed.
document.addEventListener('keydown', changeDirection);

// Generating food for the snake: we'll use an helper function which is used for the x-y coordinates
function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}


function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);

    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x === foodX && part.y === foodY;
        if (foodIsOnSnake) createFood();
    });
}

// function for draw food in the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

// function for terminate the game
function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (didCollide) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Start the game
createFood();
main();




