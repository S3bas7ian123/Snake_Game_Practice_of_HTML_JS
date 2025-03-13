const game = document.querySelector('#gameCanvas');
// canvas context:
const ctx = game.getContext('2d');
//  represent the snake as an array of coordinates:
let snake = [
    { // represents the "head" of the snake
        x: 150, // x axis
        y: 150  // y axis
    },
    {
        x: 140,
        y: 150
    },
    {
        x: 130,
        y: 150
    },
    {
        x: 120,
        y: 150
    },
    {
        x: 110,
        y: 150
    }
    // (by default our snake 'll start whit 5 squares thanks this 5 coordinates)
]
// snake move horizontally on x axis to the right 
let snakeToRight = [
    {
        x: 160,
        y: 150
    },
    {
        x: 150,
        y: 150
    },
    {
        x: 140,
        y: 150
    },
    {
        x: 130,
        y: 150
    },
    {
        x: 120,
        y: 150
    }
]

let dx = 10; // Horizontal movement of 10 pixels to the right
let dy = 0; // Vertical movement (initially 0)

// canvas styles: 
game.style.backgroundColor = ' #D5E5D5';
game.style.border = "2px solid #ADB2D4";
console.log(game);

// we need a function to draw different parts of the "snake's body"
function drawSnakeParts(snakeBody) {
    ctx.fillStyle =' #1F7D53'; // fill color
    ctx.strokeStyle ='2px #18230F'; // border color
    // fillRect and strokeRect are the default properities for drawing a rectangle. 
    ctx.fillRect(snakeBody.x, snakeBody.y, 10, 10);
    ctx.strokeRect(snakeBody.x, snakeBody.y, 10, 10);
}
// we'll use ForEach loop, for prints the parts of the canvas
function drawSnakeOnScreen() {
    snake.forEach(drawSnakeParts);
}

// new fuction for move right the snake
function runRightSnake() {
    const head = {
        x: snake[0].x + dx, // dx is the horizontal velocity of the snake.
        y: snake[0].y
    };
    snake.unshift(head); //  add the new head to the beginning of snake using unshift 
    snake.pop(); // remove the last element of snake using pop
}

// new function to manage keyboard input
function isOppositeDirection(newDx, newDy) {
   return dx === -newDx && dy === -newDy;
}

// changeDirection function, whit switch case logic 
function changeDirection(e) {
    // create constants for keyboard arrows (this numbers are  defined by standards dating back to the origins of computing)

    const LEFT_KEY = 37; // left arrow ...
    const RIGHT_KEY = 39; // right arrow ...
    const UP_KEY = 38; // up arrow ...
    const DOWN_KEY = 40; // down arrow ...

    switch (e.keyCode) {
        case LEFT_KEY:
            if(!isOppositeDirection(-10, 0)) {
                dx = -10;
                dy = 0;
            }
            break;
        case RIGHT_KEY:
            if(!isOppositeDirection(10, 0)) {
                dx = 10;
                dy = 0;
            }
            break;
        case UP_KEY:
            if(!isOppositeDirection(0, -10)) {
                dx = 0;
                dy = -10
            }
            break;
        case DOWN_KEY:
            if(!isOppositeDirection(0, 10)) {
                dx = 0;
                dy = 10;
            }
            break;
    }
}
// add an event listener for the keyboards events
document.addEventListener('keydown', changeDirection);

// call functions:
drawSnakeOnScreen();
runRightSnake();
