// class Grid {
//     _arr
//     _size
//     constructor(size) {
//         this._size = size;
//         this._arr = new Array(this._size * this._size).fill(0);
//
//     }
//
//     drawGrid(cell_size) {
//         let c;
//
//         for (let i = 0; i < this._size; i++) {
//             for (let j = 0; j < this._size; j++) {
//                 switch (this._arr[i * this._size + j]) {
//                     case 0:
//                         c = color("#CDC0B4");
//                         break;
//                     case 2:
//                         c = color("#eee4da");
//                         break;
//                     case 4:
//                         c = color("#ede0c8");
//                         break;
//                     case 8:
//                         c = color("#f2b179");
//                         break;
//                     case 16:
//                         c = color("#f59563");
//                         break;
//                     case 32:
//                         c = color("#f67c5f");
//                         break;
//                     case 64:
//                         c = color("#f65e3b");
//                         break;
//                     case 128:
//                         c = color("#edcf72");
//                         break;
//                     case 256:
//                         c = color("#edcc61");
//                         break;
//                     case 512:
//                         c = color("#edc850");
//                         break;
//                     case 1024:
//                         c = color("#edc53f");
//                         break;
//                     case 2048:
//                         c = color("#edc22e");
//                         break;
//                     case 4096:
//                         c = color("#ff3203");
//                         break;
//                     default:
//                         c = color("#000000");
//                         break;
//                 }
//
//                 fill(c);
//                 stroke(c);
//                 //draw rectangle with rounded edges for each tile
//                 rect(j * cell_size + j * 10 + 10, i * cell_size + i * 10 + 10, cell_size, cell_size, 5);
//
//                 if (this._arr[i * this._size + j] !== 0) {
//                     if (this._size === 4) {
//                         displayText(`${this._arr[i * this._size + j]}`, color(119, 110, 101, 255),
//                             40, j * cell_size + j * 10 + 10 + cell_size / 2,
//                             i * cell_size + i * 10 + 25 + cell_size / 2);
//                     } else if (this._size === 6) {
//                         displayText(`${this._arr[i * this._size + j]}`, color(119, 110, 101, 255),
//                             30, j * cell_size + j * 10 + 10 + cell_size / 2,
//                             i * cell_size + i * 10 + 22 + cell_size / 2);
//                     } else {
//                         displayText(`${this._arr[i * this._size + j]}`, color(119, 110, 101, 255),
//                             20, j * cell_size + j * 10 + 10 + cell_size / 2,
//                             i * cell_size + i * 10 + 17 + cell_size / 2);
//                     }
//
//
//                 }
//             }
//         }
//     }
//     checkEmpty(){
//         let emptyTiles = [];
//         this._arr.forEach(function(value, index) {
//             if (value === 0) {
//                 emptyTiles.push(index);
//             }
//         });
//         return emptyTiles;
//     }
//     checkContinue(){
//         let currentTile;
//         let right;
//         let bottom;
//
//         for (let i = 0; i < this._size; i++) {
//             for (let j = 0; j < this._size; j++) {
//                 currentTile = grid[i * this._size + j];
//
//                 if (currentTile === 0) {
//                     return false;
//                 }
//                 else {
//                     if (j < this._size - 1) {
//                         right = grid[i * this._size + j + 1];
//                     }
//                     else {
//                         right = 0;
//                     }
//                     if (i < this._size - 1) {
//                         bottom = grid[(i + 1) * this._size + j];
//                     }
//                     else {
//                         bottom = 0;
//                     }
//                     if (currentTile === right || currentTile === bottom) {
//                         return false ;
//                     }
//                 }
//             }
//         }
//         return true;
//     }
//     addRandomTile() {
//         let emptyTiles = this.checkEmpty();
//         let index;
//         let newTile = [2, 4];
//
//
//
//         if (emptyTiles.length > 0) {
//             index = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
//             this._arr[index] = newTile[Math.floor(Math.random() * newTile.length)];
//         }
//     }
//     updateGrid() {
//         scoreContainer.innerHTML = score;
//         this.drawGrid(CELL_SIZE);
//         if (gameOver) {
//             displayText("Game Over!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
//         }
//         else if (gameWon) {
//             displayText("You Win!\nHit Enter to Play Again", color(119, 110, 101), 32, width / 2, height / 2);
//         }
//     }
//
//     verticalSlide(direction) {
//         let previousGrid = [];
//         let column;
//         let filler;
//
//         arrayCopy(this._arr, previousGrid);
//
//         for (let i = 0; i < this._size; i++) {
//             column = [];
//             for (let j = i; j < this._size * this._size; j += this._size) {
//                 column.push(this._arr[j]);
//             }
//
//             filler = new Array(this._size - column.length).fill(0);
//             if (direction === UP_ARROW) {
//                 column = column.concat(filler);
//             }
//             else {
//                 column = filler.concat(column);
//             }
//
//             for (let k = 0; k < column.length; k++) {
//                 this._arr[k * this._size + i] = column[k];
//             }
//
//             combine(column, direction);
//
//             column = column.filter(this.notEmpty);
//
//             filler = new Array(this._size - column.length).fill(0);
//             if (direction === UP_ARROW) {
//                 column = column.concat(filler);
//             }
//             else {
//                 column = filler.concat(column);
//             }
//
//             for (let k = 0; k < column.length; k++) {
//                 this._arr[k * this._size + i] = column[k];
//             }
//         }
//         this.checkSlide(previousGrid);
//     }
//     notEmpty(x) {
//         return x > 0;
//     }
//
//
//     horizontalSlide(direction) {
//         let previousGrid = [];
//         let row;
//         let filler;
//
//         arrayCopy(this._arr, previousGrid);
//
//         for (let i = 0; i < this._size; i++) {
//             row = this._arr.slice(i * this._size, i * this._size + this._size);
//
//             filler = new Array(this._size - row.length).fill(0);
//             if (direction === LEFT_ARROW) {
//                 row = row.concat(filler);
//             }
//             else {
//                 row = filler.concat(row);
//             }
//             row = combine(row, direction);
//
//             row = row.filter(this.notEmpty);
//
//             filler = new Array(this._size - row.length).fill(0);
//             if (direction === LEFT_ARROW) {
//                 row = row.concat(filler);
//             }
//             else {
//                 row = filler.concat(row);
//             }
//
//             this._arr.splice(i * this._size, this._size);
//             this._arr.splice(i * this._size, 0, ...row);
//         }
//         this.checkSlide(previousGrid);
//     }
//
//     increaseScoreByOneCell(row,x,y,i,index){
//         if (x === y && x !== 0) {
//             row[i] = x + y;
//             score += row[i];
//             row[index] = 0;
//             if (row[i] === 2048) {
//                 gameWon = true;
//             }
//         }
//     }
//
//     combineDownRight(row) {
//         let x;
//         let y;
//
//         for (let i = row.length - 1; i > 0; i--) {
//             x = row[i];
//             let index = i - 1;
//             y = row[index];
//
//             while (y === 0 && index > 0) {
//                 y = row[index--];
//             }
//
//             this.increaseScoreByOneCell(row,x,y,i,index)
//         }
//         return row;
//     }
//
//     combineUpLeft(row) {
//         let x;
//         let y;
//
//         for (let i = 0; i < row.length - 1; i++) {
//             x = row[i];
//             let index = i + 1;
//             y = row[index];
//
//             while (y === 0 && index < row.length - 1) {
//                 y = row[index++];
//             }
//
//             this.increaseScoreByOneCell(row,x,y,i, index)
//         }
//
//         return row;
//     }
//     checkSlide(previousGrid) {
//         if (!(this._arr.every((x, i) => x === previousGrid[i]))) {
//             this.addRandomTile();
//         }
//         if (this.checkContinue()) {
//             gameOver = true;
//         }
//     }
// }