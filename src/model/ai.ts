// Minimax (+Alpha-Beta) Implementation

import _ from 'lodash';
import { BoardSize, Difficulty, PieceType } from './enum';
import { Piece } from './types';

const DEPTH_FOR_EASY = 2;
const DEPTH_FOR_NORMAL = 4;
const DEPTH_FOR_HARD = 8;

// type Position = { x: number; y: number };

type ComputerState = {
  move: PositionPair[] | null;
  score: number;
};

export type PositionPair = [number, number];

const maxScore = 100000;

export const playAI = (
  board: Piece[],
  boardSize: BoardSize,
  difficulty: Difficulty
): ComputerState => {
  const size = parseInt(boardSize, 10);
  let k = 0;
  const dummyBoard = Array.apply(null, Array(size)).map(() => new Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dummyBoard[i][j] = board[k].type;
      k++;
    }
  }

  if (difficulty === Difficulty.normal) {
    return generateDecision(dummyBoard, DEPTH_FOR_NORMAL);
  } else if (difficulty === Difficulty.hard) {
    return generateDecision(dummyBoard, DEPTH_FOR_HARD);
  }

  return generateDecision(dummyBoard, DEPTH_FOR_EASY);
};

const generateDecision = (
  board: PieceType[][],
  depth: number
): ComputerState => {
  // let startAI = new Date().getTime();

  const piecesLeft = 25;
  // pick random move if too many pieces on the board
  if (
    _.flattenDeep(board).filter((p: PieceType) => p === PieceType.piece)
      .length > piecesLeft
  ) {
    const initialMoves = _.shuffle(calculateMoves(board));
    return { move: initialMoves[0], score: -1 };
  }

  // Algorithm call
  const aiMove = maximizePlay(board, depth, 0, 0, true);

  // let endAI = new Date().getTime() - startAI;

  return aiMove;
};

const maximizePlay = (
  board: PieceType[][],
  depth: number,
  alpha: number = 0,
  beta: number = 0,
  isFirstMove: boolean = false
): ComputerState => {
  const score = -calculateScore(board);

  if (isFinished(depth, score)) return { move: null, score };

  const moves = calculateMoves(board);
  const possibleMoves = isFirstMove ? _.shuffle(moves) : moves;

  const max: ComputerState = { move: null, score: -99999 };

  // For all possible moves
  for (let m = 0; m < possibleMoves.length; m++) {
    const newState = recreateBoard(board, possibleMoves[m]);
    const nextMove = minimizePlay(newState, depth - 1, alpha, beta); // Recursive calling
    // Evaluate new move's play path
    if (max.move === null || nextMove.score > max.score) {
      max.move = possibleMoves[m];
      max.score = nextMove.score;
      alpha = nextMove.score;
    }

    if (alpha >= beta) {
      return max;
    }
  }
  return max;
};

const minimizePlay = (
  board: PieceType[][],
  depth: number,
  alpha: number = 0,
  beta: number = 0
): ComputerState => {
  const score = calculateScore(board);

  if (isFinished(depth, score)) return { move: null, score };

  const min: ComputerState = { move: null, score: 99999 };

  const possibleMoves = calculateMoves(board);

  for (let m = 0; m < possibleMoves.length; m++) {
    const newState = recreateBoard(board, possibleMoves[m]);
    const nextMove = maximizePlay(newState, depth - 1, alpha, beta);
    if (min.move === null || nextMove.score < min.score) {
      min.move = possibleMoves[m];
      min.score = nextMove.score;
      beta = nextMove.score;
    }

    if (alpha >= beta) {
      return min;
    }
  }

  return min;
};

const isFinished = (depth: number, score: number): boolean =>
  depth === 0 || score === maxScore || score === -maxScore;

const calculateScore = (board: PieceType[][]): number => {
  const lastPiece =
    _.flattenDeep(board).filter((p: PieceType) => p === PieceType.piece)
      .length === 1;
  if (lastPiece) {
    return maxScore;
  } else {
    return 0;
  }
};

const calculateMoves = (board: PieceType[][]): [PositionPair[]] => {
  const horizontalMoves: [PositionPair[]] = [] as any;
  let hMove: PositionPair[] = [];

  for (let i = 0; i < board.length; i++) {
    if (hMove.length !== 0) horizontalMoves.push(hMove);
    hMove = [];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== PieceType.obstacle) {
        if (board[i][j] !== PieceType.empty) {
          hMove.push([i, j]);
        }
      } else if (hMove.length !== 0) {
        horizontalMoves.push(hMove);
        hMove = [];
      }
    }
  }
  if (hMove.length !== 0) horizontalMoves.push(hMove);

  const verticalMoves: [PositionPair[]] = [] as any;
  let vMove: PositionPair[] = [];

  for (let j = 0; j < board.length; j++) {
    if (vMove.length !== 0) verticalMoves.push(vMove);
    vMove = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== PieceType.obstacle) {
        if (board[i][j] !== PieceType.empty) {
          vMove.push([i, j]);
        }
      } else if (vMove.length !== 0) {
        verticalMoves.push(vMove);
        vMove = [];
      }
    }
  }
  if (vMove.length !== 0) verticalMoves.push(vMove);

  // moves with maximum pieces that can be removed with one drag horizontally or vertically
  const allMoves: [PositionPair[]] = _.concat(horizontalMoves, verticalMoves);

  // all smaller combinations existing on each full move above (ex. 2 in a row = 1 left piece, 1 right piece, both)
  const allSubsetOfMoves = [] as any;
  for (let i = 0; i < allMoves.length; i++) {
    for (let k = allMoves[i].length; k > 0; k--) {
      for (let j = 0; j < k - 1; j++) {
        allSubsetOfMoves.push(allMoves[i].slice(j, k));
      }
    }
  }
  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === PieceType.piece) {
        allSubsetOfMoves.push([[i, j]]);
      }
    }
  }

  return allSubsetOfMoves;
};

// return new board after removing the pieces
const recreateBoard = (board: PieceType[][], move: PositionPair[]) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < move.length; i++) {
    const singleTile = move[i];
    const tileX = singleTile[0];
    const tileY = singleTile[1];
    newBoard[tileX][tileY] = PieceType.empty;
  }
  return newBoard;
};
