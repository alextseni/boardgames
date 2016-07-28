// ------------------------------------
// Constants
// ------------------------------------
export const START_STATE = 'START_STATE'
export const END_STATE = 'END_STATE'
export const PLAYER_STATE = 'PLAYER_STATE'
export const BOARD_STATE = 'BOARD_STATE'

export const ROWS = 6;
export const COLUMNS = 6;
// ------------------------------------
// Actions
// ------------------------------------
export function initializeBoard (random = []) {
  return {
    type: START_STATE,
    payload: {phase: 'start', turns: 0, text: 'Player 1'},
    value: random,
  }
}

export function clearBoard () {
  return {
    type: END_STATE,
    payload: {pieces: [], phase: 'end', turns: 0, text: 'Play?'},
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
                                        let type = ' ';
                                        for (let i=0;i<ROWS*COLUMNS; i++){
                                          if (action.value[i] <=0.75) {type = 'marble';}
                                          else if (action.value[i] <=0.9) {type = 'obstacle';}
                                          else {type = 'empty';}
                                          p[i] = type;}
                                        return  Object.assign({}, {pieces: p}, action.payload);},

  [END_STATE]: (state, action) => action.payload,
  [PLAYER_STATE]: (state,action) => {let nstate=[];
                                    for(let i=0;i<ROWS*COLUMNS;i++){
                                      nstate[i]=state.pieces[i];
                                    }
                                    if (state.pieces[action.payload.cell] =='marble'){
                                       nstate[action.payload.cell] = 'selected';}
                                    else if (action.payload.tag == 'reset'){
                                      for(let i=0;i<ROWS*COLUMNS;i++){
                                        if (nstate[i] == 'selected')  nstate[i] = 'marble';
                                      }
                                    }
                                    return {...state, pieces: nstate};},



  [BOARD_STATE]: (state,action) => {let nstate=[];
                                    let temp = new Array(ROWS);
                                    for(let i=0; i<ROWS; i++){
                                      temp[i] = new Array(COLUMNS);
                                    }

                                    let text = state.text;
                                    let turns = state.turns;
                                    let lastPiece=0;
                                    let x=0;
                                    let y=0;
                                    let first = true;
                                    let count_V=1;
                                    let count_H =1;
                                    let keepI = [];
                                    let keepJ = [];
                                    let correct = false;

                                    for(let i=0;i<ROWS*COLUMNS;i++){
                                      nstate[i]=state.pieces[i];
                                    }

                                    for(let i=0;i<ROWS;i++){
                                      for(let j=0; j<COLUMNS;j++){

                                         temp[i][j]=state.pieces[x];
                                         if (temp[i][j] == 'selected') {
                                           keepI[y] = i;
                                           keepJ[y] = j;
                                           y++
                                         }
                                         x++;
                                    }}
                                    for (let i=0; i<keepI.length-1; i++){
                                       if (keepI[i] == keepI[i+1]){
                                         count_H++;
                                       }
                                       if (keepJ[i] == keepJ[i+1]){
                                         count_V++;
                                       }

                                    }

                                    if (count_H ==keepI.length && count_V ==1){
                                      correct = true;
                                      for (let j=keepJ[0]; j<=keepJ[keepJ.length-1]; j++){
                                        if ((temp[keepI[0]][j] != 'empty') && (temp[keepI[0]][j] != 'selected')){
                                          correct = false;
                                        }
                                      }
                                    }

                                    if (count_H ==1 && count_V ==keepJ.length ) {
                                      correct = true;
                                      for (let i=keepI[0]; i<=keepI[keepI.length-1]; i++){
                                        if ((temp[i][keepJ[0]] != 'empty') && (temp[i][keepJ[0]] != 'selected')){
                                          correct = false;
                                        }
                                      }
                                     }

                                    state.pieces.forEach(p=> (p=='marble') ? lastPiece++ : 0);

                                    (lastPiece ==0) ? correct = false : false;

                                     if (correct) {
                                       nstate= state.pieces.map(p=> (p=='selected') ? p='empty' : p);

                                    if (lastPiece==1) {
                                       text= state.text + ' wins!';
                                     }
                                   else   {turns++;
                                      if (state.text == 'Player 1') {text  = 'Player 2';}
                                      else {text = 'Player 1';}
                                  }
                                }
                                    return {...state, pieces: nstate, turns: turns, text: text,}
                                  },
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {pieces: [], phase: 'end', turns: 0, text: "Press 'New Game' to Start!"};
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
