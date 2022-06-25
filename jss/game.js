// let GRID_SIZE = 4;
// let CELL_SIZE = 110;
// function gameRest(){
//     setup();
// }
// function Game(size){
//     GRID_SIZE = size;
//     CELL_SIZE = 110 - (size === 4 ? 0 :(size - 2) * 10);
//     setup();
// }
// let canvas;
// let grid;
// let gameOver;
// let score;
// let gameWon;
//
// scoreContainer = document.getElementById("score");
//
// function setup() {
//     canvas = createCanvas(490, 490);
//     background(187, 173, 160);
//     canvas.position(650, 50);
//     startGame();
//     grid.updateGrid();
// }
//
// function startGame() {
//     grid = new Grid(GRID_SIZE);
//     gameOver = false;
//     gameWon = false;
//     score = 0;
//     grid.addRandomTile();
//     grid.addRandomTile();
// }
//
// function keyPressed() {
//     if (!gameOver && !gameWon) {
//         switch (keyCode) {
//             case UP_ARROW:
//                 grid.verticalSlide(keyCode);
//                 grid.updateGrid();
//                 break;
//             case DOWN_ARROW:
//                 grid.verticalSlide(keyCode);
//                 grid.updateGrid();
//                 break;
//             case RIGHT_ARROW:
//                 grid.horizontalSlide(keyCode);
//                 grid.updateGrid();
//                 break;
//             case LEFT_ARROW:
//                 grid.horizontalSlide(keyCode);
//                 grid.updateGrid();
//                 break;
//         }
//     }
//     else if (keyCode === ENTER) {
//         location.reload();
//     }
// }
//
//
// function combine(row, direction) {
//     switch (direction) {
//         case DOWN_ARROW:
//             row = grid.combineDownRight(row);
//             break;
//         case RIGHT_ARROW:
//             row = grid.combineDownRight(row);
//             break;
//         case UP_ARROW:
//             row = grid.combineUpLeft(row);
//             break;
//         case LEFT_ARROW:
//             row = grid.combineUpLeft(row);
//             break;
//     }
//
//     return row;
// }
//
// function displayText(message, color, size, xpos, ypos) {
//     textSize(size);
//     textAlign(CENTER);
//     fill(color);
//     text(message, xpos, ypos);
//
// }