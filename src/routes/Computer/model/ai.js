/**
 * Minimax (+Alpha-Beta) Implementation
 */

let _ = require('lodash');

let depth = 4; //Search depth, difficulty level
const maxScore = 100000;

let iterations = 0; // Reset iteration count
let firstMove = true;

export const playAI = (brd, size, difficulty) => {
  let board= JSON.parse(JSON.stringify(brd));
  let k=0;
  iterations = 0;
  firstMove=true;
  let dummyBoard= Array.apply(null, Array(size)).map(function() {
     return new Array(size);
  });
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      dummyBoard[i][j] = board[k].type;
      k++;
    }
  }

  if (difficulty === 'easy') {
    depth = 2;
    const ai_move = generateDecision(dummyBoard);
    return ai_move;
  } else if (difficulty ==='normal') {
     depth = 4;
     const ai_move = generateDecision(dummyBoard);
     return ai_move;
  } else  if (difficulty ==='hard') {
     depth = 6;
     const ai_move = generateDecision(dummyBoard);
     return ai_move;
}

return;
  // console.log('move: ' + ai_move[0]);

}

const generateDecision = function(board) {

        // AI is thinking
        let startAI = new Date().getTime();

        // Algorithm call
        let ai_move = maximizePlay(board, depth);

        let endAI = new Date().getTime() - startAI;

        // Debug
        return ai_move;
}

const maximizePlay = function(board, depth, alpha, beta) {

  let score = -calcScore(board);



    // Break
  if (isFinished(depth,score)) return [null, score];
    // Column, Score
    let max = [null,-99999];
    //get array for possible moves
    let possibleMoves = calcMoves(board);
  //  if (a<1){
  //    a++
  //    console.log(possibleMoves);
  //  }
    // For all possible moves
    for (let m = 0; m < possibleMoves.length; m++) {
  //     console.log('MOVE: ' + possibleMoves[m]);
        let new_board = copyBoard(board, possibleMoves[m]); // Create new board

        iterations++; // Debug
        let next_move = minimizePlay(new_board, depth - 1, alpha, beta); // Recursive calling

            // Evaluate new move
        if (max[0] == null || next_move[1] > max[1]) {
                max[0] = possibleMoves[m];
                max[1] = next_move[1];
                alpha = next_move[1];
            }

        if (alpha >= beta) return max;
    }

    return max;
}

const minimizePlay = function(board, depth, alpha, beta) {

    let score = calcScore(board);



    if (isFinished(depth, score)) return [null, score];

     let min = [null,99999];
    // get array of moves
    let possibleMoves = calcMoves(board);

    // For all possible moves
    for (let m = 0; m < possibleMoves.length; m++) {
        let new_board = copyBoard(board, possibleMoves[m]);

        iterations++;
        let next_move = maximizePlay(new_board, depth - 1, alpha, beta);
        if (min[0] == null || next_move[1] < min[1]) {
                min[0] = possibleMoves[m];
                min[1] = next_move[1];
                beta = next_move[1];
        }
        if (alpha >= beta) return min;
      }
    return min;
}


const isFinished = function(depth, score) {
    if (depth == 0 || score == maxScore || score == -maxScore) {
        return true;
    }
    return false;
}

const calcMoves = function(board) {

  let allMoves = [];
  let horizontalMoves =[]; //array of arrays
  let verticalMoves = []; //array of arrays
  let move = []; //array

  //horizontal sets
  for (let i = 0; i<board.length; i++) {
    if (move.length !=0) horizontalMoves.push(move);
    move=[];
    for (let j = 0; j<board.length; j++) {
      if (board[i][j] != 'obstacle') {
        if (board[i][j] != 'empty'){
          move.push([i,j]);
      }
      }
      else {
        if (move.length !=0) {
  //        while(board[move[move.length-1][0]][move[move.length-1][1]]  === 'empty'){
  //          move.pop();
  //        }
            horizontalMoves.push(move);
          }
        move = [];

    }
  }
}
if (move.length !=0) horizontalMoves.push(move);
move=[];
   //vertical sets
   for (let j = 0; j<board.length; j++) {
     if (move.length !=0) verticalMoves.push(move);
     move=[];
     for (let i = 0; i<board.length; i++) {
       if (board[i][j] != 'obstacle') {
        if (board[i][j] != 'empty'){
          move.push([i,j]);
       }
     }
       else {
         if (move.length !=0) {
  //         while(board[move[move.length-1][0]][move[move.length-1][1]]  === 'empty'){
  //           move.pop();
  //         }
           verticalMoves.push(move);
         }
         move = [];
       }
     }
   }
if (move.length !=0) verticalMoves.push(move);

//   if (c<1){
//     c++
//     console.log(_.concat(horizontalMoves,verticalMoves));
//   }
  allMoves  = getAllCombos(_.concat(horizontalMoves,verticalMoves), board);
  if (firstMove) {
    allMoves = _.shuffle(allMoves); //shuffle the moves so that in case of score 0, the comp will pick a random move
    firstMove = false;
  }

  return allMoves;
}

 const calcScore = function(board) {
         // Determine score
         let lastPiece =(_.flattenDeep(board).filter(p => p === 'marble').length == 1);
         if (lastPiece) {
           return maxScore;
         }// if human won
         else {
           return 0;
         }
}

 //create board after move
 const  copyBoard = function(board, move) {
    let newBoard= JSON.parse(JSON.stringify(board));

    for (let i=0; i<move.length; i++) {
      newBoard[move[i][0]][move[i][1]] = 'empty';
    }
    return newBoard;
 }

function getAllCombos(array, board) {
    let combos = [];
    for(let i=0; i<array.length ; i++){
    for (let k=array[i].length; k>0 ; k--) {
      for(let j=0; j<k ; j++){
      // if (pieces.filter(p => board[p[0]][p[1]] === 'marble').length !=0) {
          combos.push( array[i].slice(j,k));
  //    }
    }
  }
  }
  _.uniq(combos, m => JSON.stringify(m));
  return combos;
}
