import { BoardSize, Difficulty, GamePhase } from '../../model/enum';
import { createBoard } from '../../model/gameLogic';
import {
  BOARD_STATE,
  END_STATE,
  OPTIONS_STATE,
  PLAYER_STATE,
  START_STATE,
} from '../types/game';

export const initializeBoard = (boardSize: string) => {
  const size = parseInt(boardSize, 10);
  const randomBoard = new Array(size * size)
    .fill(0, 0, size * size)
    .map(n => Math.random());
  const boardContent = createBoard(randomBoard, size);

  const players = [GamePhase.player1Turn, GamePhase.player2Turn];
  const playerToGoFirst = players[Math.floor(Math.random() * players.length)];

  return {
    type: START_STATE,
    payload: {
      phase: playerToGoFirst,
      pieces: boardContent.pieces,
      allMarbles: boardContent.initialMarbles,
    },
  };
};

export const clearBoard = () => ({
  type: END_STATE,
});

export const markPiece = (cell: number) => ({
  type: PLAYER_STATE,
  payload: { cell },
});

export const changeBoard = (choice: BoardSize) => ({
  type: OPTIONS_STATE,
  payload: { size: choice },
});

export const changeDifficulty = (choice: Difficulty) => ({
  type: OPTIONS_STATE,
  payload: { difficulty: choice },
});

export const removePieces = () => ({
  type: BOARD_STATE,
});

export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
  changeBoard,
  changeDifficulty,
};
