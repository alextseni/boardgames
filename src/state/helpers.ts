import _ from 'lodash';
import { PositionPair } from '../model/ai';
import { GamePhase, PieceType } from '../model/enum';
import { Piece } from '../model/types';
import { GameState } from './reducers/game';

export const createBoard = (
  randomValues: number[],
  size: number
): { pieces: Piece[]; initialMarbles: number } => {
  const pieces = [];
  const percentageOfPieces = 0.75;
  const percentageOfObstacles = 0.9;
  for (let i = 0, z = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      randomValues[z] <= percentageOfPieces
        ? (pieces[z] = { x: i, y: j, type: PieceType.piece })
        : randomValues[z] <= percentageOfObstacles
        ? (pieces[z] = { x: i, y: j, type: PieceType.obstacle })
        : (pieces[z] = { x: i, y: j, type: PieceType.empty });
      z++;
    }
  }

  const initialMarbles = pieces.filter(p => p.type === PieceType.piece).length;
  return { pieces, initialMarbles };
};

export const updateSelectionState = (
  pieces: Piece[],
  payload: { cell?: number; aiMove?: [PositionPair] }
) => {
  if (payload.aiMove) {
    return pieces.map((piece: Piece) =>
      payload.aiMove!.find(
        (pair: PositionPair) =>
          pair[0] === piece.x &&
          pair[1] === piece.y &&
          piece.type === PieceType.piece
      )
        ? { ...piece, type: PieceType.selected }
        : piece
    );
  }

  return pieces.map((piece: Piece, key: number) =>
    key === payload.cell ? { ...piece, type: PieceType.selected } : piece
  );
};

const isHorizontal = (pieces: Piece[], groupH: string[], groupV: string[]) =>
  groupH.length === 1 &&
  !pieces
    .filter(
      p =>
        p.x.toString() === groupH[0] &&
        groupV[0] <= p.y.toString() &&
        p.y.toString() < groupV[groupV.length - 1]
    )
    .find(p => p.type === PieceType.obstacle || p.type === PieceType.piece);

const isVertical = (pieces: Piece[], groupH: string[], groupV: string[]) =>
  groupV.length === 1 &&
  !pieces
    .filter(
      p =>
        p.y.toString() === groupV[0] &&
        groupH[0] <= p.x.toString() &&
        p.x.toString() < groupH[groupH.length - 1]
    )
    .find(p => p.type === PieceType.obstacle || p.type === PieceType.piece);

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
        pieces,
        phase: GamePhase.player2Turn,
      },
      is: state.phase === GamePhase.player1Turn,
    },
    {
      st: {
        ...state,
        pieces,
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
