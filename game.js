let GRID_SIZE = 4;
let CELL_SIZE = 110;
function gameRest(){
    setup();
}
function Game(size){
    GRID_SIZE = size;
    CELL_SIZE = 110 - (size === 4 ? 0 :(size - 2) * 10);
    console.log(CELL_SIZE);
    setup();
}
let canvas;
let grid;
let gameOver;
let score;
let gameWon;

scoreContainer = document.getElementById("score");

function setup() {
    canvas = createCanvas(490, 490);
    background(187, 173, 160);
    canvas.position(650, 50);
    startGame();
    updateGrid();
}

function startGame() {
    grid = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    gameOver = false;
    gameWon = false;
    score = 0;
    addRandomTile();
    addRandomTile();
}

function keyPressed() {
    if (!gameOver && !gameWon) {
        switch (keyCode) {
            case UP_ARROW:
                verticalSlide(keyCode);
                updateGrid();
                break;
            case DOWN_ARROW:
                verticalSlide(keyCode);
                updateGrid();
                break;
            case RIGHT_ARROW:
                horizontalSlide(keyCode);
                updateGrid();
                break;
            case LEFT_ARROW:
                horizontalSlide(keyCode);
                updateGrid();
                break;
        }
    }
    else if (keyCode === ENTER) {
        location.reload();
    }
}

function notEmpty(x) {
    return x > 0;
}

function checkSlide(previousGrid) {
    if (!(grid.every((x, i) => x === previousGrid[i]))) {
        addRandomTile();
    }
    if (checkContinue()) {
        gameOver = true;
    }
}

function checkContinue() {
    let currentTile;
    let right;
    let bottom;

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            currentTile = grid[i * GRID_SIZE + j];

            if (currentTile === 0) {
                return false;
            }
            else {
                if (j < GRID_SIZE - 1) {
                    right = grid[i * GRID_SIZE + j + 1];
                }
                else {
                    right = 0;
                }
                if (i < GRID_SIZE - 1) {
                    bottom = grid[(i + 1) * GRID_SIZE + j];
                }
                else {
                    bottom = 0;
                }
                if (currentTile === right || currentTile === bottom) {
                    return false ;
                }
            }
        }
    }
    return true;
}

function combine(row, direction) {
    switch (direction) {
        case DOWN_ARROW:
            row = combineDownRight(row);
            break;
        case RIGHT_ARROW:
            row = combineDownRight(row);
            break;
        case UP_ARROW:
            row = combineUpLeft(row);
            break;
        case LEFT_ARROW:
            row = combineUpLeft(row);
            break;
    }

    return row;
}

function addRandomTile() {
    let emptyTiles = [];
    let index;
    let newTile = [2, 4];

    grid.forEach(function(value, index) {
        if (value === 0) {
            emptyTiles.push(index);
        }
    });

    if (emptyTiles.length > 0) {
        index = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[index] = newTile[Math.floor(Math.random() * newTile.length)];
    }
}

function displayText(message, color, size, xpos, ypos) {
    textSize(size);
    textAlign(CENTER);
    fill(color);
    text(message, xpos, ypos);

}

function drawGrid() {
    let c;

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            switch (grid[i * GRID_SIZE + j]) {
                case 0:
                    c = color("#CDC0B4");
                    break;
                case 2:
                    c = color("#eee4da");
                    break;
                case 4:
                    c = color("#ede0c8");
                    break;
                case 8:
                    c = color("#f2b179");
                    break;
                case 16:
                    c = color("#f59563");
                    break;
                case 32:
                    c = color("#f67c5f");
                    break;
                case 64:
                    c = color("#f65e3b");
                    break;
                case 128:
                    c = color("#edcf72");
                    break;
                case 256:
                    c = color("#edcc61");
                    break;
                case 512:
                    c = color("#edc850");
                    break;
                case 1024:
                    c = color("#edc53f");
                    break;
                case 2048:
                    c = color("#edc22e");
                    break;
                case 4096:
                    c = color("#ff3203");
                    break;
                default:
                    c = color("#000000");
                    break;
            }

            fill(c);
            stroke(c);
            //draw rectangle with rounded edges for each tile
            rect(j * CELL_SIZE + j * 10 + 10, i * CELL_SIZE + i * 10 + 10, CELL_SIZE, CELL_SIZE, 5);

            if (grid[i * GRID_SIZE + j] !== 0) {
                if(GRID_SIZE === 4){
                    displayText(`${grid[i * GRID_SIZE + j]}`, color(119,110,101,255),
                        40,j * CELL_SIZE + j * 10 + 10 + CELL_SIZE / 2,
                        i * CELL_SIZE + i * 10 + 25 + CELL_SIZE / 2);
                }
                else if(GRID_SIZE === 6){
                    displayText(`${grid[i * GRID_SIZE + j]}`, color(119,110,101,255),
                        30,j * CELL_SIZE + j * 10 + 10 + CELL_SIZE / 2,
                        i * CELL_SIZE + i * 10 + 22 + CELL_SIZE / 2);
                }
                else {
                    displayText(`${grid[i * GRID_SIZE + j]}`, color(119,110,101,255),
                        20,j * CELL_SIZE + j * 10 + 10 + CELL_SIZE / 2,
                        i * CELL_SIZE + i * 10 + 17+ CELL_SIZE / 2);
                }


            }
        }
    }
}