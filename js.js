var GRID_SIZE = 4;
var CELL_SIZE = 110;
function gameRest(){
    setup();
}
function game4(){
    GRID_SIZE = 4;
    CELL_SIZE = 110;
    setup();
}
function game6(){
    GRID_SIZE = 6;
    CELL_SIZE = 70;
    setup();
}
function game8(){
    GRID_SIZE = 8;
    CELL_SIZE = 50;
    setup();
}
var canvas;
var grid;
var gameOver;
var score;
var gameWon;

scoreContainer = document.getElementById("score");

function setup() {
    canvas = createCanvas(490, 490);
    background(187, 173, 160);
    canvas.position(50, 50);
    startGame();
    updateGrid();
}

function startGame() {
    grid = new Array(GRID_SIZE * GRID_SIZE).fill(2);
    gameOver = false;
    gameWon = false;
    score = 0;
    addRandomTile();
    addRandomTile();
}
function updateGrid() {
    scoreContainer.innerHTML = score;
    drawGrid();
    if (gameOver) {
        displayText("Game Over!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
    }
    else if (gameWon) {
        displayText("You Win!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
    }
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

function verticalSlide(direction) {
    var previousGrid = [];
    var column;
    var filler;

    arrayCopy(grid, previousGrid);

    for (var i = 0; i < GRID_SIZE; i++) {
        column = [];
        for (var j = i; j < GRID_SIZE * GRID_SIZE; j += GRID_SIZE) {
            column.push(grid[j]);
        }

        filler = new Array(GRID_SIZE - column.length).fill(0);
        if (direction === UP_ARROW) {
            column = column.concat(filler);
        }
        else {
            column = filler.concat(column);
        }

        for (var k = 0; k < column.length; k++) {
            grid[k * GRID_SIZE + i] = column[k];
        }

        combine(column, direction);

        column = column.filter(notEmpty);

        filler = new Array(GRID_SIZE - column.length).fill(0);
        if (direction === UP_ARROW) {
            column = column.concat(filler);
        }
        else {
            column = filler.concat(column);
        }

        for (var k = 0; k < column.length; k++) {
            grid[k * GRID_SIZE + i] = column[k];
        }
    }
    checkSlide(previousGrid);
}

function horizontalSlide(direction) {
    var previousGrid = [];
    var row;
    var filler;

    arrayCopy(grid, previousGrid);

    for (var i = 0; i < GRID_SIZE; i++) {
        row = grid.slice(i * GRID_SIZE, i * GRID_SIZE + GRID_SIZE);

        filler = new Array(GRID_SIZE - row.length).fill(0);
        if (direction === LEFT_ARROW) {
            row = row.concat(filler);
        }
        else {
            row = filler.concat(row);
        }
        row = combine(row, direction);

        row = row.filter(notEmpty);

        filler = new Array(GRID_SIZE - row.length).fill(0);
        if (direction === LEFT_ARROW) {
            row = row.concat(filler);
        }
        else {
            row = filler.concat(row);
        }

        grid.splice(i * GRID_SIZE, GRID_SIZE);
        grid.splice(i * GRID_SIZE, 0, ...row);
    }
    checkSlide(previousGrid);
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
    var currentTile;
    var right;
    var bottom;

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
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

function combineDownRight(row) {
    var x;
    var y;

    for (var i = row.length - 1; i > 0; i--) {
        x = row[i];
        index = i - 1;
        y = row[index];

        while (y === 0 && index > 0) {
            y = row[index--];
        }

        if (x === y && x !== 0) {
            row[i] = x + y;
            score += row[i];
            row[index] = 0;
            if (row[i] === 2048) {
                gameWon = true;
            }
        }
    }
    return row;
}

function combineUpLeft(row) {
    var x;
    var y;

    for (var i = 0; i < row.length - 1; i++) {
        x = row[i];
        index = i + 1;
        y = row[index];

        while (y === 0 && index < row.length - 1) {
            y = row[index++];
        }

        if (x === y && x !== 0) {
            row[i] = x + y;
            score += row[i];
            row[index] = 0;
            if (row[i] === 2048) {
                gameWon = true;
            }
        }
    }

    return row;
}

function addRandomTile() {
    var emptyTiles = [];
    var index;
    var newTile = [2, 4];

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
    textAlign(CENTER);
    textSize(size);
    fill(color);
    text(message, xpos, ypos);
}

function drawGrid() {
    var c;

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
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
            rect(j * CELL_SIZE + j * 10 + 10, i * CELL_SIZE + i * 10 + 10, CELL_SIZE, CELL_SIZE, 50);

            if (grid[i * GRID_SIZE + j] !== 0) {
                displayText(`${grid[i * GRID_SIZE + j]}`, color(255, 255, 255),
                    (GRID_SIZE == 4 ? 45: (GRID_SIZE == 6 ? 25 : 20)),
                    j * CELL_SIZE + j * 10 + 10 + CELL_SIZE / 2,
                    i * CELL_SIZE + i * 10 + 20 + CELL_SIZE / 2);
            }
        }
    }
}