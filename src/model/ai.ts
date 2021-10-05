// Minimax (+Alpha-Beta) Implementation

import { BoardSize, Difficulty, PieceType } from './enum';

let _ = require('lodash');

type MovesState = {
  movesPattern: string;
  depth: number;
  score: number | null;
};
const maxScore = 100000;
let previousStatesMoves: MovesState[] = [];
let firstMove = true;

export const playAI = (brd, boardSize: BoardSize, difficulty: Difficulty) => {
  const size = parseInt(boardSize);
  const board = JSON.parse(JSON.stringify(brd));
  let k = 0;
  previousStatesMoves = [];
  firstMove = true;
  let dummyBoard = Array.apply(null, Array(size)).map(() => new Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dummyBoard[i][j] = board[k].type;
      k++;
    }
  }

  if (difficulty === Difficulty.easy) {
    return generateDecision(dummyBoard, 2);
  } else if (difficulty === Difficulty.normal) {
    return generateDecision(dummyBoard, 4);
  } else if (difficulty === Difficulty.hard) {
    return generateDecision(dummyBoard, 6);
  }

  return;
};

function generateDecision(board: PieceType[][], depth: number) {
  let startAI = new Date().getTime();

  if (
    _.flattenDeep(board).filter((p: PieceType) => p === PieceType.piece)
      .length > 15
  ) {
    const initialMoves = calcMoves(board);
    return [initialMoves[0], null];
  }

  // Algorithm call
  let aiMove = maximizePlay(board, depth);

  let endAI = new Date().getTime() - startAI;
  // Debug
  return aiMove;
}

function maximizePlay(
  board: PieceType[][],
  depth: number,
  alpha?: any,
  beta?: any
) {
  const score = -calcScore(board);

  // Break

  if (isFinished(depth, score)) return [null, score];

  // get array for possible moves
  let possibleMoves = calcMoves(board);
  //  console.log(possibleMoves);
  //  console.log(depth);

  //  console.log('max');

  //  console.log(previousStatesMoves);
  let max = [null, -99999];

  let alreadyCalculated = previousStatesMoves.find(
    p =>
      _.isEqual(p.movesPattern, _.countBy(possibleMoves, 'length')) &&
      p.depth === depth
  );

  if (alreadyCalculated) {
    return [null, alreadyCalculated.score];
  }
  // Column, Score

  // For all possible moves
  for (let m = 0; m < possibleMoves.length; m++) {
    // console.log('MOVE: ' + possibleMoves[m]);
    let newState = copyBoard(board, possibleMoves[m]); // Create new board

    let nextMove = minimizePlay(newState, depth - 1, alpha, beta); // Recursive calling
    // Evaluate new move
    if (max[0] == null || nextMove[1] > max[1]) {
      max[0] = possibleMoves[m];
      max[1] = nextMove[1];
      alpha = nextMove[1];
    }

    if (alpha >= beta) {
      //    previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: max })
      return max;
    }
  }
  previousStatesMoves.push({
    movesPattern: _.countBy(possibleMoves, 'length'),
    depth: depth,
    score: max[1],
  });
  return max;
}

function minimizePlay(
  board: PieceType[][],
  depth: number,
  alpha?: number,
  beta?: number
) {
  let score = calcScore(board);
  if (isFinished(depth, score)) return [null, score];
  // get array of moves
  let min = [null, 99999];
  let possibleMoves = calcMoves(board);
  //  console.log(possibleMoves);
  //console.log(depth);
  let alreadyCalculated = previousStatesMoves.find(
    p =>
      _.isEqual(p.movesPattern, _.countBy(possibleMoves, 'length')) &&
      p.depth === depth
  );
  if (alreadyCalculated) {
    //    console.log(alreadyCalculated);
    return [null, alreadyCalculated.score];
  }

  //console.log('min');
  //console.log(previousStatesMoves);
  // For all possible moves
  for (let m = 0; m < possibleMoves.length; m++) {
    let newState = copyBoard(board, possibleMoves[m]);
    let nextMove = maximizePlay(newState, depth - 1, alpha, beta);
    if (min[0] == null || nextMove[1] < min[1]) {
      min[0] = possibleMoves[m];
      min[1] = nextMove[1];
      beta = nextMove[1];
    }

    if (alpha >= beta) {
      //  previousStatesMoves.push({ movesPattern: _.countBy(possibleMoves, 'length'), depth: depth, score: min });
      return min;
    }
  }
  previousStatesMoves.push({
    movesPattern: _.countBy(possibleMoves, 'length'),
    depth: depth,
    score: min[1],
  });
  return min;
}

function isFinished(depth: number, score: number) {
  if (depth === 0 || score === maxScore || score === -maxScore) {
    return true;
  }
  return false;
}

function calcMoves(board: PieceType[][]) {
  let allMoves = [];
  let horizontalMoves = []; // array of arrays of horizontal moves
  let verticalMoves = []; // array of arrays of vertical moves
  let move = []; // array of a move [[i,j], [i,j],...]

  // horizontal sets
  for (let i = 0; i < board.length; i++) {
    if (move.length !== 0) horizontalMoves.push(move);
    move = [];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== PieceType.obstacle) {
        if (board[i][j] !== PieceType.empty) {
          move.push([i, j]);
        }
      } else if (move.length !== 0) {
        horizontalMoves.push(move);
        move = [];
      }
    }
  }

  if (move.length !== 0) horizontalMoves.push(move);
  move = [];

  // vertical sets
  for (let j = 0; j < board.length; j++) {
    if (move.length !== 0) verticalMoves.push(move);
    move = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== PieceType.obstacle) {
        if (board[i][j] !== PieceType.empty) {
          move.push([i, j]);
        }
      } else if (move.length !== 0) {
        verticalMoves.push(move);
        move = [];
      }
    }
  }

  if (move.length !== 0) verticalMoves.push(move);

  allMoves = getAllCombos(_.concat(horizontalMoves, verticalMoves), board);
  if (firstMove) {
    allMoves = _.shuffle(allMoves); // shuffle the moves so that in case of score 0, the comp will pick a random move
    firstMove = false;
  }

  return allMoves;
}

function calcScore(board: PieceType[][]) {
  // Determine score
  let lastPiece =
    _.flattenDeep(board).filter((p: PieceType) => p === PieceType.piece)
      .length === 1;
  if (lastPiece) {
    return maxScore;
  } else {
    return 0;
  }
}

// create board after move
function copyBoard(board: PieceType[][], move) {
  let newBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < move.length; i++) {
    newBoard[move[i][0]][move[i][1]] = PieceType.empty;
  }

  return newBoard;
}

function getAllCombos(array, board: PieceType[][]) {
  let combos = [];
  for (let i = 0; i < array.length; i++) {
    for (let k = array[i].length; k > 0; k--) {
      for (let j = 0; j < k - 1; j++) {
        combos.push(array[i].slice(j, k));
      }
    }
  }
  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === PieceType.piece) {
        combos.push([[i, j]]);
      }
    }
  }

  return combos;
}
