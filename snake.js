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

let dx = 0; // Initialise to 0 to avoid initial movement
let dy = 0; 

// canvas styles: 
game.style.backgroundColor = ' #D5E5D5';
game.style.border = '2px solid #ADB2D4';

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

// new fuction for update the snake
function advanceSnake() {
    const head = {
        x: snake[0].x + dx, // dx is the horizontal velocity of the snake.
        y: snake[0].y + dy
    };
    snake.unshift(head); //  add the new head to the beginning of snake using unshift 
    snake.pop(); // remove the last element of snake using pop

    // we need to know if the snake is eating the food
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
    if (didEatFood) {    
        createFood();  
    } else {    
        snake.pop();  
    }
}


// refactoring the code: restructuring exiting code
function clearCanvas() {
    ctx.fillStyle = ' #D5E5D5';
    ctx.strokeStyle = '2px solid #ADB2D4';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// now we need call my snake different times, we need a setTimout functions and we'll call it for 5 times. We'll calling one fucntion at the time
// function stepOne() {
//     setTimeout(function onTick() {
//         clearCanvas();
//         advanceSnake();
//         drawSnakeOnScreen();
//         stepTwo()
//     }, 100) // 100 milliseconds
// }

// function stepTwo() {
//     setTimeout(function onTick() {
//         clearCanvas();
//         advanceSnake();
//         drawSnakeOnScreen();
//         stepThree()
//     }, 100) 
// }

// function stepThree() {
//     setTimeout(function onTick() {
//         clearCanvas();
//         advanceSnake();
//         drawSnakeOnScreen();
//         stepFour()
//     }, 100) 
// }

// function stepFour() {
//     setTimeout(function onTick() {
//         clearCanvas();
//         advanceSnake();
//         drawSnakeOnScreen();
//         stepFive()
//     }, 100)
// }

// function stepFive() {
//     setTimeout(function onTick() {
//         clearCanvas();
//         advanceSnake();
//         drawSnakeOnScreen();
//         stepOne()
//     }, 100) 
// }

// snake keep moving!! We can instead create one function and call it over and over again
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnakeOnScreen();
        main(); // call main again
    }, 100) 
}

// changing the snake's direction when arrows keys is pressed
function changeDirection(e) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;  
    const DOWN_KEY = 40;

    const keyPressed = e;  
    const goingUp = dy === -10;  
    const goingDown = dy === 10;  
    const goingRight = dx === 10;  
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
    if (keyPressed === UP_KEY && !goingUp) { dx = 0; dy = -10; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingDown) { dx = 0; dy = 10; }
}

// To connect changeDirection to our game, we can use addEventListener on the document to ‘listen’ for when a key is pressed.
document.addEventListener('keydown', changeDirection);

// Generating food for the snake: we'll use an helper function which is used for the x-y coordinates
function randomTen(min, max) {  
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood() {  
    foodX = randomTen(0, gameCanvas.width - 10);  
    foodY = randomTen(0, gameCanvas.height - 10);
}

snake.forEach(function isFoodOnSnake(part) {    
    const foodIsOnSnake = part.x == foodX && part.y == foodY    
    if (foodIsOnSnake) createFood();  
});

// function for draw food in the canvas
function drawFood() { 
    ctx.fillStyle = 'red'; 
    ctx.strokeStyle = 'darkred'; 
    ctx.fillRect(foodX, foodY, 10, 10); 
    ctx.strokeRect(foodX, foodY, 10, 10);
}


// call functions:
drawSnakeOnScreen();
main();
changeDirection();

