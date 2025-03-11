const game = document.querySelector("#gameCanvas");
// canvas context:
const ctx = game.getContext("2d");
//  represent the snake as an array of coordinates:
let snake = [
    {
        x: 150,
        y: 150
    },
    {
        x: 140,
        y: 150
    },
    {
        x: 150,
        y: 150
    },
    {
        x: 150,
        y: 150
    },
    {
        x: 150,
        y: 150
    }
]

// canvas styles: 
game.style.backgroundColor = "#D5E5D5";
game.style.border = "2px solid #ADB2D4";
console.log(game);