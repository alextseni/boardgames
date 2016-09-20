import { ROWS, COLUMNS } from '../modules/game.js';

var _ = require('lodash');

export const createBoard = (randomValues) => {
  let pieces = [];
  for (let i = 0, z = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      randomValues[z] <= 0.75 ? pieces[z] = { x: i, y: j, type: 'marble' }
      : randomValues[z] <= 0.9 ? pieces[z] = { x: i, y: j, type: 'obstacle' }
      : pieces[z] = { x: i, y: j, type: 'empty' };
      z++;
    }
  };

  const initialMarbles = pieces.filter((p) => p.type === 'marble').length;
  return { pieces: pieces, initialMarbles: initialMarbles };
};

export const updateSelectionState = (pieces, payload) => {
  let p = pieces.slice(0, ROWS * COLUMNS);

  if (payload.tag === 'mark') {
    p[payload.cell].type = 'selected';
  }

  if (payload.tag === 'reset') {
    p = pieces.map((p) => p.type === 'selected' ? { ...p, type: 'marble' } : p);
  }

  return p;
};

const isHorizontal = (pieces, groupH, groupV) => {
  return ((groupH.length === 1) && !pieces
  .filter(
    (p) => (p.x == groupH[0] && groupV[0] <= p.y && p.y < groupV[groupV.length - 1])
  ).find(
    p => (p.type === 'obstacle' || p.type === 'marble')
  ));
};

const isVertical = (pieces, groupH, groupV) => {
  return ((groupV.length === 1) && !pieces
  .filter(
    (p) => (p.y == groupV[0] && groupH[0] <= p.x && p.x < groupH[groupH.length - 1])
  ).find(
    p => (p.type === 'obstacle' || p.type === 'marble')
  ));
};

export const evaluateSelection = (state) => {
  const groupHorizontal = Object.keys(
    _.countBy(
      _.filter(
        state.pieces, (o) => o.type === 'selected'
      ), (o) => o.x
    )
  );

  const groupVertical = Object.keys(
    _.countBy(
      _.filter(
        state.pieces, (o) => o.type === 'selected'
      ), (o) => o.y
    )
  );

  const pieces = state.pieces.map(p => p.type === 'selected' ? { ...p, type: 'empty' } : p);
  const gameEnded = state.pieces.filter(p => (p.type === 'marble')).length === 0;
  const validSelection = isHorizontal(state.pieces, groupHorizontal, groupVertical) || isVertical(state.pieces, groupHorizontal, groupVertical);
  const playerWon = state.pieces.filter(p => (p.type === 'marble')).length === 1;

  const result = [
    {
      st: { ...state },
      is: !validSelection || gameEnded,
    },
    {
      st: { ...state, pieces: pieces, text: state.text + ' wins!' },
      is: playerWon,
    },
    {
      st: { ...state, pieces: pieces, text: 'Player1' },
      is: state.text === 'Player2',
    },
    {
      st: { ...state, pieces: pieces, text: 'Player2' },
      is: state.text === 'Player1',
    },
  ];

  return result.find((r) => r.is === true).st;
};
