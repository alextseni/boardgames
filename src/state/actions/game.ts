import { BoardSize, Difficulty, GamePhase } from '../../model/enum';
import { createBoard } from '../../model/gameLogic';
import {
  BOARD_STATE,
  END_STATE,
  OPTIONS_STATE,
  PLAYER_STATE,
  START_STATE,
} from '../types/game';

export function initializeBoard(boardSize: string) {
  const size = parseInt(boardSize);
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
}

export function clearBoard() {
  return {
    type: END_STATE,
  };
}

export function markPiece(cell: number) {
  return {
    type: PLAYER_STATE,
    payload: { cell },
  };
}

export function changeBoard(choice: BoardSize) {
  return {
    type: OPTIONS_STATE,
    payload: { size: choice },
  };
}

export function changeDifficulty(choice: Difficulty) {
  return {
    type: OPTIONS_STATE,
    payload: { difficulty: choice },
  };
}

export function removePieces() {
  return {
    type: BOARD_STATE,
  };
}

export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
  changeBoard,
  changeDifficulty,
};
