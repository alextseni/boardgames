import { createBoard, evaluateSelection, updateSelectionState } from '../model/gameLogic.js';
// ------------------------------------
// Constants
// ------------------------------------
export const START_STATE = 'START_STATE';
export const END_STATE = 'END_STATE';
export const PLAYER_STATE = 'PLAYER_STATE';
export const BOARD_STATE = 'BOARD_STATE';

export const ROWS = 6;
export const COLUMNS = 6;

// ------------------------------------
// Actions
// ------------------------------------
export function initializeBoard() {
  const random = () => {
    let rand = new Array(ROWS * COLUMNS);
    return rand.fill(0, 0, ROWS * COLUMNS).map(n => Math.random());
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

export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
  removeMarks,
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [START_STATE]: (state, action) => {
    const boardContent = createBoard(action.value);
    return Object.assign(
      {},
      { pieces: boardContent.pieces, allMarbles: boardContent.initialMarbles },
      action.payload
    );
  },

  [END_STATE]: (state, action) => action.payload,

  [PLAYER_STATE]: (state, action) => ({
    ...state,
    pieces: updateSelectionState(state.pieces, action.payload),
  }),

  [BOARD_STATE]: (state, action) => (
    evaluateSelection(state)
  ),

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { pieces: [], phase: 'end', allMarbles: '0', text: 'end' };
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
