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



// call functions:
drawSnakeOnScreen();
runRightSnake();
