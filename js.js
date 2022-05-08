var GRID_SIZE = 4;
var CELL_SIZE = 110;
function newgame(){
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
    // canvas = createCanvas(GRID_SIZE * CELL_SIZE+(GRID_SIZE == 4 ? 50: (GRID_SIZE == 6 ? 70 : 90)) ,
    //     GRID_SIZE * CELL_SIZE + (GRID_SIZE == 4 ? 50: (GRID_SIZE == 6 ? 70 : 90)));
    canvas = createCanvas(490, 490);
    background(187, 173, 160);
    centerCanvas(canvas);
    newGame();
    noLoop();
    updateGrid();
}

/* centers the game canvavs on window */
function centerCanvas() {
    var x = 50; //(windowWidth - width) / 2;
    var y = 50; //(windowHeight - height) / 2 + 60;
    canvas.position(x, y);
}

/* recenters the game canvas if the window is resized */
function windowResized() {
    centerCanvas();
}

/* creates a new game with the starting game board */
function newGame() {
    //fill grid with empty values (aka 0) 
    grid = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    gameOver = false;
    gameWon = false;
    score = 0;
    //add the two starting tiles
    addRandomTile();
    addRandomTile();
}

function updateGrid() {
    displayScore();
    drawGrid();
    if (gameOver) {
        displayGameOver();
    }
    else if (gameWon) {
        displayGameWon();
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

/* trượt các ô theo chiều dọc (lên hoặc xuống) và kết hợp các ô có cùng giá trị nếu chúng va chạm. */
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

        //kết hợp các giá trị giống như theo hướng thẳng đứng nhất định
        column = combine(column, direction);

        //loại bỏ tất cả các giá trị trống
        column = column.filter(notEmpty);

        //thêm đúng số giá trị trống sau các giá trị trống
        filler = new Array(GRID_SIZE - column.length).fill(0);
        if (direction === UP_ARROW) {
            column = column.concat(filler);
        }
        else {
            column = filler.concat(column);
        }

        //cập nhật cột hiện tại trong lưới
        for (var k = 0; k < column.length; k++) {
            grid[k * GRID_SIZE + i] = column[k];
        }

        //kết hợp các giá trị đã được phân tách trước đây, nhưng bây giờ liền kề
        combine(column, direction);
    }
    checkSlide(previousGrid);
}

/* slides the tiles horizontally (left or right) and combines tiles of the
   same value if they collide. */
function horizontalSlide(direction) {
    var previousGrid = [];
    var row;
    var filler;

    arrayCopy(grid, previousGrid);

    for (var i = 0; i < GRID_SIZE; i++) {
        //get row
        row = grid.slice(i * GRID_SIZE, i * GRID_SIZE + GRID_SIZE);

        //combine like values in given horizontal direction
        row = combine(row, direction);

        //remove all empty values
        row = row.filter(notEmpty);

        //add the correct number of empty values after the nonempty values
        filler = new Array(GRID_SIZE - row.length).fill(0);
        if (direction === LEFT_ARROW) {
            row = row.concat(filler);
        }
        else {
            row = filler.concat(row);
        }

        //remove the current row from the grid and add the updated row
        grid.splice(i * GRID_SIZE, GRID_SIZE);
        grid.splice(i * GRID_SIZE, 0, ...row);
    }
    checkSlide(previousGrid);
}

/* checks that a title is nonempty (value is not zero). Used to filter a row of tiles */
function notEmpty(x) {
    return x > 0;
}

/* checks, after a key is pressed, if anything on the grid actually moved or if the
   game is over */
function checkSlide(previousGrid) {
    if (!(grid.every((x, i) => x === previousGrid[i]))) {
        addRandomTile();
    }
    if (!movesLeft()) {
        gameOver = true;
    }
}

/* checks if there are any moves to play. In other words, there is either an empty
   tile or if two adjacent tiles have the same value. */
function movesLeft() {
    var movesLeft = false;
    var flag = false;
    var currentTile;
    var right;
    var bottom;

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            if (!flag) {
                currentTile = grid[i * GRID_SIZE + j];

                //if grid still has empty spots, there are moves left
                if (currentTile === 0) {
                    movesLeft = true;
                    flag = true;
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
                    //if a neighbor of the current tile has the same value, there are moves left
                    if (currentTile === right || currentTile === bottom) {
                        movesLeft = true;
                        flag = true;
                    }
                }
            }
        }
    }

    return movesLeft;
}

/* combines tiles of the same values together of a specific row in a given direction */
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

/* combines tiles of the same value togther downwards or to the right */
function combineDownRight(row) {
    var x;
    var y;

    for (var i = row.length - 1; i > 0; i--) {
        //get current and subseqent tiles
        x = row[i];
        index = i - 1;
        y = row[index];

        //skip empty tiles until a nonempty tile or the beginning of the row is reached
        while (y === 0 && index > 0) {
            y = row[index--];
        }

        //if the adjacent tiles have equal value, combine and update score
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

/* combines tiles of the same value together upwards or to the left */
function combineUpLeft(row) {
    var x;
    var y;

    for (var i = 0; i < row.length - 1; i++) {
        //get current and subsequent tiles
        x = row[i];
        index = i + 1;
        y = row[index];

        //skip empty tiles until a nonempty tile or the end of the row is reached
        while (y === 0 && index < row.length - 1) {
            y = row[index++];
        }

        //if the adjacent tiles have equal value, combine and update score
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

/* adds a 2 or 4 tile to an empty spot in the grid randomly */
function addRandomTile() {
    var emptyTiles = [];
    var index;
    var newTile = [2, 4];

    //add the indices of all empty tiles to the emptyTiles array
    grid.forEach(function(value, index) {
        if (value === 0) {
            emptyTiles.push(index);
        }
    });

    if (emptyTiles.length > 0) {
        //get the index of a random empty tile in the grid
        index = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        //set the value of that empty tile to 2 or 4, randomly chosen
        grid[index] = newTile[Math.floor(Math.random() * newTile.length)];
    }
}

/*----------------STYLE----------------*/
/* insert the score in the score container */
function displayScore() {
    scoreContainer.innerHTML = `${score}`;
}

function displayGameOver() {
    displayText("Game Over!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
}

function displayGameWon() {
    displayText("You Win!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
}

function displayText(message, color, size, xpos, ypos) {
    textAlign(CENTER);
    textSize(size);
    fill(color);
    text(message, xpos, ypos);
}

/* draw and style the game grid */
function drawGrid() {
    var c;

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            //color of tile depends on value of tile
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

            //fill tile
            fill(c);
            //thickness of tile border
            strokeWeight(2);
            //color of tile border
            stroke(c);
            //draw rectangle with rounded edges for each tile
            rect(j * CELL_SIZE + j * 10 + 10, i * CELL_SIZE + i * 10 + 10, CELL_SIZE, CELL_SIZE, 5);

            if (grid[i * GRID_SIZE + j] !== 0) {
                displayText(`${grid[i * GRID_SIZE + j]}`,
                    color(255, 255, 255),
                    (GRID_SIZE == 4 ? 45: (GRID_SIZE == 6 ? 25 : 20)),
                    j * CELL_SIZE + j * 10 + 10 + CELL_SIZE / 2,
                    i * CELL_SIZE + i * 10 + 20 + CELL_SIZE / 2);
            }
        }
    }
}