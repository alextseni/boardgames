var _ = require('lodash');

export const createBoard = (randomValues, size) => {
  let pieces = [];
  for (let i = 0, z = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
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
  let p = pieces.slice();

  if (payload.tag === 'mark') {
    p = p.map((p, key) => (key == payload.cell) ? { ...p, type: 'selected' } : p);
  }

  if (payload.tag === 'comp' && payload.aiMove) {
    for (let i=0; i<payload.aiMove.length; i++) {
      p =  p.map((p) => (p.x == payload.aiMove[i][0] && p.y == payload.aiMove[i][1] && p.type == 'marble') ? {...p, type: 'selected'} : p);
    };
  };

  return p;
};

const isHorizontal = (pieces, groupH, groupV) => {
  return ((groupH.length === 1) && !pieces
  .filter(
    (p) => (p.x == groupH[0] && groupV[0] <= p.y && p.y < groupV[groupV.length - 1])
  ).find(
    (p) => (p.type === 'obstacle' || p.type === 'marble')
  ));
};

const isVertical = (pieces, groupH, groupV) => {
  return ((groupV.length === 1) && !pieces
  .filter(
    (p) => (p.y == groupV[0] && groupH[0] <= p.x && p.x < groupH[groupH.length - 1])
  ).find(
    (p) => (p.type === 'obstacle' || p.type === 'marble')
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
      st: { ...state, pieces: state.pieces.map((p) => p.type === 'selected' ? { ...p, type: 'marble' } : p) },
      is: !validSelection || gameEnded,
    },
    {
      st: { ...state, pieces: pieces, text: state.text + ' wins!' },
      is: playerWon,
    },
    {
      st: { ...state, pieces: pieces, phase: 'Player2Move', text: 'Player2' },
      is: state.phase === 'Player1Move',
    },
    {
      st: { ...state, pieces: pieces, phase: 'Player1Move', text: 'Player1' },
      is: state.phase === 'Player2End',
    },
    {
      st: { ...state, pieces: pieces, phase: 'Player1Move', text: 'Player1' },
      is: state.phase === 'Player2Move',
    },
  ];

  return result.find((r) => r.is === true).st;
};
