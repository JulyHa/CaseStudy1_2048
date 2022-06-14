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

function verticalSlide(direction) {
    let previousGrid = [];
    let column;
    let filler;

    arrayCopy(grid, previousGrid);

    for (let i = 0; i < GRID_SIZE; i++) {
        column = [];
        for (let j = i; j < GRID_SIZE * GRID_SIZE; j += GRID_SIZE) {
            column.push(grid[j]);
        }

        filler = new Array(GRID_SIZE - column.length).fill(0);
        if (direction === UP_ARROW) {
            column = column.concat(filler);
        }
        else {
            column = filler.concat(column);
        }

        for (let k = 0; k < column.length; k++) {
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

        for (let k = 0; k < column.length; k++) {
            grid[k * GRID_SIZE + i] = column[k];
        }
    }
    checkSlide(previousGrid);
}

function horizontalSlide(direction) {
    let previousGrid = [];
    let row;
    let filler;

    arrayCopy(grid, previousGrid);

    for (let i = 0; i < GRID_SIZE; i++) {
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

function increaseScoreByOneCell(row,x,y,i,index){
    if (x === y && x !== 0) {
        row[i] = x + y;
        score += row[i];
        row[index] = 0;
        if (row[i] === 2048) {
            gameWon = true;
        }
    }
}

function combineDownRight(row) {
    let x;
    let y;

    for (let i = row.length - 1; i > 0; i--) {
        x = row[i];
        index = i - 1;
        y = row[index];

        while (y === 0 && index > 0) {
            y = row[index--];
        }

       increaseScoreByOneCell(row,x,y,i,index)
    }
    return row;
}

function combineUpLeft(row) {
    let x;
    let y;

    for (let i = 0; i < row.length - 1; i++) {
        x = row[i];
        index = i + 1;
        y = row[index];

        while (y === 0 && index < row.length - 1) {
            y = row[index++];
        }

        increaseScoreByOneCell(row,x,y,i, index)
    }

    return row;
}