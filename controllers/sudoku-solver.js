class SudokuSolver {

  grid(puzzleString, set) {
    //assign puzzleString to array grid
    const puzzleArray = [
      puzzleString.slice(0, 9).split(''),
      puzzleString.slice(9, 18).split(''),
      puzzleString.slice(18, 27).split(''),
      puzzleString.slice(27, 36).split(''),
      puzzleString.slice(36, 45).split(''),
      puzzleString.slice(45, 54).split(''),
      puzzleString.slice(54, 63).split(''),
      puzzleString.slice(63, 72).split(''),
      puzzleString.slice(72, 81).split('')
    ]
    return puzzleArray
    }

  validate(puzzleString) {
    const length = puzzleString.length;
    for (let i = 0; i < puzzleString.length; i++){
      if (/[A-Za-z]/.test(puzzleString[i])){
        return { 
          error: 'Invalid characters in puzzle' 
        };
      }
    }
    if (puzzleString.length == 0){
      return {
        error: 'Required field missing'
      }
    // give in
    /* }else if (/[^1-9\.]/.test(puzzleString)){
      return {
        error: 'Invalid characters in puzzle'
      }; */
    }else if (length != 81){
      return {
        error: 'Expected puzzle to be 81 characters long'
      };
    }else {
      return true;
    }
  }

  checkRowPlacement(puzzleArray, row, column, value) {
    let checkString;
    //identify values in row 
    switch (row){
      case 'A':
        checkString = puzzleArray[0];
        break;
      case 'B':
        checkString = puzzleArray[1];
        break;
      case 'C':
        checkString = puzzleArray[2];
        break;
      case 'D':
        checkString = puzzleArray[3];
        break;
      case 'E':
        checkString = puzzleArray[4];
        break;
      case 'F':
        checkString = puzzleArray[5];
        break;
      case 'G':
        checkString = puzzleArray[6];
        break;
      case 'H':
        checkString = puzzleArray[7];
        break;
      case 'I':
        checkString = puzzleArray[8];
        break;
    };
    if (checkString[(column - 1)] == value){ //check if value is already present in defined cell
      return true;
    }else if (!checkString[(column - 1)] == '.'){ //check if defined cell is empty
      return false;
    }else if (!checkString.includes(value)){ //check if row already contains value
      return true;
    }else {
      return false;
    }
  }

  checkColPlacement(puzzleArray, row, column, value) {
    //identify values in column
    let checkString = [
      puzzleArray[0][column - 1],
      puzzleArray[1][column - 1],
      puzzleArray[2][column - 1],
      puzzleArray[3][column - 1],
      puzzleArray[4][column - 1],
      puzzleArray[5][column - 1],
      puzzleArray[6][column - 1],
      puzzleArray[7][column - 1],
      puzzleArray[8][column - 1],
    ];
    if (checkString[(row - 1)] == value){ //check if value is already present in defined cell
      return true;
    }else if (!checkString[(row - 1)] == '.'){ //check if defined cell is empty
      return false;
    }else if (!checkString.includes(value)){ //check if column already contains value
      return true;
    }else {
      return false
    }
  }

  checkRegionPlacement(puzzleArray, row, column, value) {
    let rowRegion;
    let columnRegion;
    let checkString;
    var testRow;
    //identify vertical region
    if (/[A-C]/i.test(row)){
      rowRegion = 1;
    }else if (/[D-F]/i.test(row)){
      rowRegion = 2;
    }else if (/[G-I]/i.test(row)){
      rowRegion = 3;
    }
    //identify horizontal region
    if (/[1-3]/.test(column)){
      columnRegion = 1;
    }else if (/[4-6]/.test(column)){
      columnRegion = 2;
    }else if (/[7-9]/.test(column)){
      columnRegion = 3;
    }
    if (rowRegion == 1){
      if (columnRegion == 1){
        checkString = [
          puzzleArray[0].slice(0, 3).join(','),
          puzzleArray[1].slice(0, 3).join(','),
          puzzleArray[2].slice(0, 3).join(',')
        ].join(',').split(',');
      }else if (columnRegion == 2){
        checkString = [
          puzzleArray[0].slice(3, 6).join(','),
          puzzleArray[1].slice(3, 6).join(','),
          puzzleArray[2].slice(3, 6).join(',')
        ].join(',').split(',');
      }else if (columnRegion == 3){
        checkString = [
          puzzleArray[0].slice(6, 9).join(','),
          puzzleArray[1].slice(6, 9).join(','),
          puzzleArray[2].slice(6, 9).join(',')
        ].join(',').split(',');
      };
    }else if (rowRegion == 2){
      if (columnRegion == 1){
        checkString = [
          puzzleArray[3].slice(0, 3).join(','),
          puzzleArray[4].slice(0, 3).join(','),
          puzzleArray[5].slice(0, 3).join(',')
        ].join(',').split(',');
        testRow = row - 3;
      }else if (columnRegion == 2){
        checkString = [
          puzzleArray[3].slice(3, 6).join(','),
          puzzleArray[4].slice(3, 6).join(','),
          puzzleArray[5].slice(3, 6).join(',')
        ].join(',').split(',');
        testRow = row - 3;
      }else if (columnRegion == 3){
        checkString = [
          puzzleArray[3].slice(6, 9).join(','),
          puzzleArray[4].slice(6, 9).join(','),
          puzzleArray[5].slice(6, 9).join(',')
        ].join(',').split(',');
        testRow = row - 3;
      };
    }else if (rowRegion == 3){
      if (columnRegion == 1){
        checkString = [
          puzzleArray[6].slice(0, 3).join(','),
          puzzleArray[7].slice(0, 3).join(','),
          puzzleArray[8].slice(0, 3).join(',')
        ].join(',').split(',');
        testRow = row - 6;
      }else if (columnRegion == 2){
        checkString = [
          puzzleArray[6].slice(3, 6).join(','),
          puzzleArray[7].slice(3, 6).join(','),
          puzzleArray[8].slice(3, 6).join(',')
        ].join(',').split(',');
      }else if (columnRegion == 3){
        checkString = [
          puzzleArray[6].slice(6, 9).join(','),
          puzzleArray[7].slice(6, 9).join(','),
          puzzleArray[8].slice(6, 9).join(',')
        ].join(',').split(',');
        testRow = row - 6;
      };
    }
    if (checkString[(row - 1)] == value){ //check if value is already present in defined cell
      return true;
    }else if (!checkString[(row - 1)] == '.'){ //check if defined cell is empty
      return false;
    }else if (!checkString.includes(value)){ //check if column already contains value
      return true;
    }
  }

  solve(puzzleString) {
    const puzzleArray = this.grid(puzzleString);
    let cycles = 0
    while (puzzleArray.flat().includes('.') && cycles < 20){
      cycles++;
      const passing = [
        [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]], [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]]
      ];
      for (let i = 1; i <= 9; i++){
        const rowLookup = {1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I'}
        let iKey = rowLookup[i];
        for (let j = 1; j <= 9; j++){
          if (puzzleArray[i - 1][j - 1] == '.'){
            for (let k = 1; k <= 9; k++){
              if (this.checkColPlacement(puzzleArray, iKey, j, k.toString()) && this.checkRowPlacement(puzzleArray, iKey, j, k.toString()) && this.checkRegionPlacement(puzzleArray, iKey, j, k.toString())){
                passing[i - 1][j - 1].push(k);
              }
            }
          if (passing[i - 1][j - 1].length == 1){
            puzzleArray[i - 1][j - 1] = passing[i - 1][j - 1].toString();
            passing[i - 1][j - 1] = [];
          }
          }
        }
      }
    }
    if (puzzleArray.flat().includes('.')){
      return {
        error: 'Puzzle cannot be solved'
      };
    }else {
      return {
        solution: puzzleArray.flat(2).join('')
      };
    }
  }
}

module.exports = SudokuSolver;

