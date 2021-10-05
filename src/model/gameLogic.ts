import { GameState } from '../state/reducers/game';
import { GamePhase, PieceType } from './enum';
import { Piece } from './types';

var _ = require('lodash');

export const createBoard = (randomValues: number[], size: number) => {
  let pieces = [];
  for (let i = 0, z = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      randomValues[z] <= 0.75
        ? (pieces[z] = { x: i, y: j, type: PieceType.piece })
        : randomValues[z] <= 0.9
        ? (pieces[z] = { x: i, y: j, type: PieceType.obstacle })
        : (pieces[z] = { x: i, y: j, type: PieceType.empty });
      z++;
    }
  }

  const initialMarbles = pieces.filter(p => p.type === PieceType.piece).length;
  return { pieces: pieces, initialMarbles: initialMarbles };
};

export const updateSelectionState = (
  pieces: Piece[],
  payload: { cell?: number; aiMove?: any }
) => {
  let p = pieces.slice();

  if (payload.cell !== undefined) {
    p = p.map((p, key: number) =>
      key == payload.cell ? { ...p, type: PieceType.selected } : p
    );
  }

  if (payload.aiMove) {
    for (let i = 0; i < payload.aiMove.length; i++) {
      p = p.map((p: Piece) =>
        p.x == payload.aiMove![i][0] &&
        p.y == payload.aiMove![i][1] &&
        p.type == PieceType.piece
          ? { ...p, type: PieceType.selected }
          : p
      );
    }
  }

  return p;
};

const isHorizontal = (pieces: Piece[], groupH: string[], groupV: string[]) => {
  return (
    groupH.length === 1 &&
    !pieces
      .filter(
        p =>
          p.x.toString() === groupH[0] &&
          groupV[0] <= p.y.toString() &&
          p.y.toString() < groupV[groupV.length - 1]
      )
      .find(p => p.type === PieceType.obstacle || p.type === PieceType.piece)
  );
};

const isVertical = (pieces: Piece[], groupH: string[], groupV: string[]) => {
  return (
    groupV.length === 1 &&
    !pieces
      .filter(
        p =>
          p.y.toString() === groupV[0] &&
          groupH[0] <= p.x.toString() &&
          p.x.toString() < groupH[groupH.length - 1]
      )
      .find(p => p.type === PieceType.obstacle || p.type === PieceType.piece)
  );
};

export const evaluateSelection = (state: GameState) => {
  const groupHorizontal = Object.keys(
    _.countBy(
      _.filter(state.pieces, (o: Piece) => o.type === PieceType.selected),
      (o: Piece) => o.x
    )
  );

  const groupVertical = Object.keys(
    _.countBy(
      _.filter(state.pieces, (o: Piece) => o.type === PieceType.selected),
      (o: Piece) => o.y
    )
  );

  const pieces = state.pieces.map(p =>
    p.type === PieceType.selected ? { ...p, type: PieceType.empty } : p
  );
  const gameEnded =
    state.pieces.filter(p => p.type === PieceType.piece).length === 0;
  const validSelection =
    isHorizontal(state.pieces, groupHorizontal, groupVertical) ||
    isVertical(state.pieces, groupHorizontal, groupVertical);
  const playerWon =
    state.pieces.filter(p => p.type === PieceType.piece).length === 1;

  const player2Plays =
    state.phase === GamePhase.player2Turn ||
    state.phase === GamePhase.computerTurn;
  const result = [
    {
      st: {
        ...state,
        pieces: state.pieces.map(p =>
          p.type === PieceType.selected ? { ...p, type: PieceType.piece } : p
        ),
      },
      is: !validSelection || gameEnded,
    },
    {
      st: { ...state, pieces, phase: GamePhase.player2Wins },

      is: playerWon && player2Plays,
    },
    {
      st: { ...state, pieces, phase: GamePhase.player1Wins },

      is: playerWon && state.phase === GamePhase.player1Turn,
    },
    {
      st: {
        ...state,
        pieces: pieces,
        phase: GamePhase.player2Turn,
      },
      is: state.phase === GamePhase.player1Turn,
    },
    {
      st: {
        ...state,
        pieces: pieces,
        phase: GamePhase.player1Turn,
      },
      is: player2Plays,
    },
    {
      st: {
        ...state,
      },
      is: true,
    },
  ];

  return result.find(r => r.is === true)!.st;
};
