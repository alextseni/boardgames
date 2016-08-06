// ------------------------------------
// Constants
// ------------------------------------
var _ = require('lodash');

export const START_STATE = 'START_STATE'
export const END_STATE = 'END_STATE'
export const PLAYER_STATE = 'PLAYER_STATE'
export const BOARD_STATE = 'BOARD_STATE'

export const ROWS = 6;
export const COLUMNS = 6;
// ------------------------------------
// Actions
// ------------------------------------
export function initializeBoard () {
  const random = () => {let rand= new Array(ROWS*COLUMNS);
                        return rand.fill(0,0,ROWS*COLUMNS).map(n => Math.random());}
  return {
    type: START_STATE,
    payload: {phase: 'start', text: 'Player1'},
    value: random(),
  }
}

export function clearBoard () {
  return {
    type: END_STATE,
    payload: {pieces: [], phase: 'end', allMarbles: 0, text: 'end'},
  }
}

export function markPiece (cell) {
  return {
    type: PLAYER_STATE,
    payload: {cell: cell, tag: 'mark'}
  }
}

export function removeMarks () {
  return {
    type: PLAYER_STATE,
    payload: {tag: "reset"},
  }
}
export function removePieces () {
  return {
    type: BOARD_STATE,
    payload: [],
  }
}


export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
  removeMarks,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [START_STATE]: (state, action) => {
    let p = [];
    for (let i=0, z=0;i<ROWS; i++){
      for (let j=0;j<COLUMNS; j++){
          action.value[z] <=0.75 ? p[z] = {x: i, y: j, type: 'marble'} :
          action.value[z] <=0.9  ? p[z] = {x: i, y: j, type: 'obstacle'} :
                                   p[z] = {x: i, y: j, type: 'empty'};
          z++;
      }}
    return (Object.assign({}, {pieces: p, allMarbles: p.filter((m)=> m.type=='marble').length },  action.payload))},

  [END_STATE]: (state, action) => action.payload,

  [PLAYER_STATE]: (state,action) => {
    let p = state.pieces.slice(0,ROWS*COLUMNS);

    action.payload.tag == 'mark' ? p[action.payload.cell].type = 'selected' :
    action.payload.tag == 'reset'? p = state.pieces.map(p=> p.type == 'selected' ? {...p, type: 'marble'} : p) : false

     return {...state, pieces: p};
  },

  [BOARD_STATE]: (state,action) => {

    let correct = false;
    const countX = Object.keys(_.countBy(_.filter(state.pieces,(o)=> o.type == 'selected'),(o)=> o.x));
    const countY = Object.keys(_.countBy(_.filter(state.pieces,(o)=> o.type == 'selected'),(o)=> o.y));

    const evaluate = (counter, stop, axis, m, n) =>
    {
             correct = !state.pieces.find(p=>p[m] == counter && p[n] == axis[0] && p.type == 'obstacle');
             (!correct || counter==stop) ? 0 : evaluate(--counter, stop, axis, m,n);
             return;
    }

   (countY.length == 1) ? evaluate(countX[countX.length-1], countX[0], countY, 'x', 'y') : false;
   (countX.length == 1) ? evaluate(countY[countY.length-1], countY[0], countX, 'y', 'x') : false;

    const pieces = state.pieces.map(p=>p.type == 'selected' ? {...p, type: 'empty'} : p);

    const result = [
      {st: {...state}                                              , is: !correct || state.pieces.filter(p=> (p.type=='marble')).length == 0},
      {st: {...state,pieces: pieces, text: state.text + ' wins!'}  , is: state.pieces.filter(p=> (p.type=='marble')).length == 1},
      {st: {...state,pieces: pieces, text: 'Player1'}              , is: state.text == 'Player2'},
      {st: {...state,pieces: pieces, text: 'Player2'}              , is: state.text == 'Player1'},
    ]

    return result.find((r) => r.is == true).st;
  },
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {pieces: [], phase: 'end', allMarbles: "0", text: "end"};
export default function gameReducer (state = initialState, action) {
   const handler = ACTION_HANDLERS[action.type]
   return handler ? handler(state, action) : state
}
