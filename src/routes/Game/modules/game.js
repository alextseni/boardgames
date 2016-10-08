import { createBoard, evaluateSelection, updateSelectionState} from '../model/gameLogic.js';
import { playAI } from 'routes/Computer/model/ai'
// ------------------------------------
// Constants
// ------------------------------------
export const START_STATE = 'START_STATE';
export const END_STATE = 'END_STATE';
export const PLAYER_STATE = 'PLAYER_STATE';
export const BOARD_STATE = 'BOARD_STATE';
export const COMP_STATE = 'COMP_STATE';
export const MODE_STATE = 'MODE_STATE';

// ------------------------------------
// Actions
// ------------------------------------
export function initializeBoard(size) {
  const random = () => {
    let rand = new Array(size*size);
    return rand.fill(0, 0, size * size).map(n => Math.random());
  };

  return {
    type: START_STATE,
    payload: { phase: 'start', text: 'Player1' },
    value: random(),
  };
}

export function clearBoard() {
  return {
    type: END_STATE,
    payload: { pieces: [], phase: 'end', allMarbles: 0, text: 'end' },
  };
}

export function markPiece(cell) {
  return {
    type: PLAYER_STATE,
    payload: { cell: cell, tag: 'mark' },
  };
}

export function changeBoard(choice) {
  return {
    type: MODE_STATE,
    payload:  ['size', choice],
  };
}
export function changeDifficulty(choice) {
  return {
    type: MODE_STATE,
    payload: ['difficulty', choice],
  };
}

export function removeMarks() {
  return {
    type: PLAYER_STATE,
    payload: { tag: 'reset' },
  };
}

export function removePieces() {
  return {
    type: BOARD_STATE,
    payload: [],
  };
}

export function playComp() {
  return {
    type: COMP_STATE,
    payload: { tag:'comp' },
  };
}

export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
  removeMarks,
  playComp,
  changeBoard,
  changeDifficulty,
};


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [START_STATE]: (state, action) => {
    const boardContent = createBoard(action.value, state.options.size);
    return Object.assign(
      {},
      {
        pieces: boardContent.pieces,
        allMarbles: boardContent.initialMarbles,
        options: state.options,
      },
      action.payload
    );
  },

  [END_STATE]: (state, action) =>  {
    return Object.assign(
      {},
      {options: state.options},
      action.payload
    );
  },
  [PLAYER_STATE]: (state, action) => ({
    ...state,
    pieces: updateSelectionState(state.pieces, action.payload),
  }),

  [BOARD_STATE]: (state, action) => (
    evaluateSelection(state)
  ),

  [COMP_STATE]: (state,action) => {
    const aiMove = playAI(state.pieces, state.options.size, state.options.difficulty);
    console.log('score: ' + aiMove[1]);
    return ({
      ...state,
      pieces: updateSelectionState(state.pieces, {tag: action.payload.tag, aiMove: aiMove[0]}),
    });
  },

  [MODE_STATE]: (state,action) => {
    let options = state.options;
    options[action.payload[0]] = action.payload[1];
    return ({
      ...state,
      options
    });
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { pieces: [], phase: 'end', allMarbles: '0', text: 'end', options: {difficulty: 'normal', size: 5}};
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
