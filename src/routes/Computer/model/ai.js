// Minimax (+Alpha-Beta) Implementation

let _ = require('lodash');

let depth;      //  Search depth, difficulty level
const maxScore = 100000;
let previousStatesMoves = [];
let iterations = 0; // Reset iteration count
let firstMove = true;

export const playAI = (brd, size, difficulty) => {
  let board = JSON.parse(JSON.stringify(brd));
  let k = 0;
  iterations = 0;
  previousStatesMoves = [];
  firstMove = true;
  console.log("START TURN");
  let dummyBoard = Array.apply(null, Array(size)).map(() => new Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dummyBoard[i][j] = board[k].type;
      k++;
    }
  }

  if (difficulty === 'easy') {
    depth = 2;
    const aiMove = generateDecision(dummyBoard);
    return aiMove;
  } else if (difficulty === 'normal') {
    depth = 4;
    const aiMove = generateDecision(dummyBoard);
    return aiMove;
  } else if (difficulty === 'hard') {
    depth = 6;
    const aiMove = generateDecision(dummyBoard);
    return aiMove;
  }

  return;

  // console.log('move: ' + ai_move[0]);
};

function generateDecision(board) {
  let startAI = new Date().getTime();

  if (_.flattenDeep(board).filter(p => p === 'marble').length > 15) {
    let initialMoves = calcMoves(board);
    return [initialMoves[0], null];
  }

  // Algorithm call
  let aiMove = maximizePlay(board, depth);

  let endAI = new Date().getTime() - startAI;
  // Debug
  return aiMove;
};

function maximizePlay(board, depth, alpha, beta) {
  let score = -calcScore(board);

  // Break

  if (isFinished(depth, score)) return [null, score];

  // get array for possible moves
  let possibleMoves = calcMoves(board);
//  console.log(possibleMoves);
//  console.log(depth);

//  console.log('max');

//  console.log(previousStatesMoves);
  let max = [null, -99999];

  let alreadyCalculated = previousStatesMoves
  .find(p =>
    _.isEqual(p.movesPattern,
      _.countBy(possibleMoves, 'length')
    ) && p.depth === depth
  );

  if (alreadyCalculated) {
    return [null, alreadyCalculated.score];
  }
  // Column, Score



  // For all possible moves
  for (let m = 0; m < possibleMoves.length; m++) {
    // console.log('MOVE: ' + possibleMoves[m]);
    let newState = copyBoard(board, possibleMoves[m]);   // Create new board

    iterations++; // Debug
    let nextMove = minimizePlay(newState, depth - 1, alpha, beta); // Recursive calling
    // Evaluate new move
    if (max[0] == null || nextMove[1] > max[1]) {
      max[0] = possibleMoves[m];
      max[1] = nextMove[1];
      alpha = nextMove[1];
    }

    if (alpha >= beta){
  //    previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: max })
      return max;
    }
  }
  previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: max[1] })
  return max;
};

function minimizePlay(board, depth, alpha, beta) {
  let score = calcScore(board);
  if (isFinished(depth, score)) return [null, score];
  // get array of moves
  let min = [null, 99999];
  let possibleMoves = calcMoves(board);
//  console.log(possibleMoves);
  //console.log(depth);
  let alreadyCalculated = previousStatesMoves
  .find(p =>
    _.isEqual(p.movesPattern, _.countBy(possibleMoves, 'length')) && p.depth === depth);
  if (alreadyCalculated) {
//    console.log(alreadyCalculated);
    return [null, alreadyCalculated.score];
  }

  //console.log('min');
  //console.log(previousStatesMoves);
  // For all possible moves
  for (let m = 0; m < possibleMoves.length; m++) {

    let newState = copyBoard(board, possibleMoves[m]);
    iterations++;
    let nextMove = maximizePlay(newState, depth - 1, alpha, beta);
    if (min[0] == null || nextMove[1] < min[1]) {
      min[0] = possibleMoves[m];
      min[1] = nextMove[1];
      beta = nextMove[1];
    }

    if (alpha >= beta ) {
    //  previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: min });
      return min;
    }
  }
  previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: min[1] });
  return min;
};

function isFinished(depth, score) {
  if (depth === 0 || score === maxScore || score === -maxScore) {
    return true;
  }
  return false;
};

function calcMoves(board) {
  let allMoves = [];
  let horizontalMoves = [];   // array of arrays of horizontal moves
  let verticalMoves = [];    // array of arrays of vertical moves
  let move = [];            // array of a move [[i,j], [i,j],...]

  // horizontal sets
  for (let i = 0; i < board.length; i++) {
    if (move.length !== 0) horizontalMoves.push(move);
    move = [];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== 'obstacle') {
        if (board[i][j] !== 'empty') {
          move.push([i, j]);
        }
      } else if (move.length !== 0) {
        horizontalMoves.push(move);
        move = [];
      }
    }
  };

  if (move.length !== 0) horizontalMoves.push(move);
  move = [];

  // vertical sets
  for (let j = 0; j < board.length; j++) {
    if (move.length !== 0) verticalMoves.push(move);
    move = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== 'obstacle') {
        if (board[i][j] !== 'empty') {
          move.push([i, j]);
        }
      } else if (move.length !== 0) {
        verticalMoves.push(move);
        move = [];
      }
    }
  };

  if (move.length !== 0) verticalMoves.push(move);

  allMoves = getAllCombos(_.concat(horizontalMoves, verticalMoves), board);
  if (firstMove) {
    allMoves = _.shuffle(allMoves); // shuffle the moves so that in case of score 0, the comp will pick a random move
    firstMove = false;
  }

  return allMoves;
};

function calcScore(board) {
  // Determine score
  let lastPiece = (_.flattenDeep(board).filter(p => p === 'marble').length === 1);
  if (lastPiece) {
    return maxScore;
  } else {
    return 0;
  }
};

// create board after move
function copyBoard(board, move) {
  let newBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < move.length; i++) {
    newBoard[move[i][0]][move[i][1]] = 'empty';
  }

  return newBoard;
};

function getAllCombos(array, board) {
  let combos = [];
  for (let i = 0; i < array.length; i++) {
    for (let k = array[i].length; k > 0; k--) {
      for (let j = 0; j < k-1; j++) {
        combos.push(array[i].slice(j, k));
      }
    }
  }
  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === 'marble') {
        combos.push([[i,j]]);
      }
    }
  }

  return combos;
}
