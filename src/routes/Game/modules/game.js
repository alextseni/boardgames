// ------------------------------------
// Constants
// ------------------------------------
export const START_STATE = 'START_STATE'
export const END_STATE = 'END_STATE'
export const PLAYER_STATE = 'PLAYER_STATE'
export const BOARD_STATE = 'BOARD_STATE'

// ------------------------------------
// Actions
// ------------------------------------
export function initializeBoard (pieces = []) {
  return {
    type: START_STATE,
    payload: {pieces: pieces, phase: 'start', turns: 0, text: 'Player 1'},
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
    payload: cell
  }
}

export function removePieces () {
  return {
    type: BOARD_STATE,
    payload: [],
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const actions = {
  initializeBoard,
  clearBoard,
  markPiece,
  removePieces,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [START_STATE]: (state, action) => action.payload,
  [END_STATE]: (state, action) => {return {pieces: action.payload.pieces,
                                   phase: action.payload.phase,
                                   turns: action.payload.turns,
                                   text: action.payload.text}},
  [PLAYER_STATE]: (state,action) => {let nstate=[];
                                    for(let i=0;i<64;i++){
                                      nstate[i]=state.pieces[i];
                                    }
                                    if (nstate[action.payload]=='marble'){
                                    nstate[action.payload] = 'selected';}
                                    else if (nstate[action.payload]=='selected'){
                                    nstate[action.payload] = 'marble';}
                                    return {pieces: nstate, phase: 'start', turns: state.turns , text: state.text,};},



  [BOARD_STATE]: (state,action) => {let nstate=[];
                                    let temp = new Array(8);
                                    for(let i=0; i<8; i++){
                                      temp[i] = new Array(8);
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

                                    for(let i=0;i<64;i++){
                                      nstate[i]=state.pieces[i];
                                    }
                                    for(let i=0;i<8;i++){
                                      for(let j=0; j<8;j++){

                                         temp[i][j]=nstate[x];
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
                                        console.log(temp[keepI[0]][j]);
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

                                      for(let i=0;i<64;i++){

                                        if (nstate[i]=='marble'){
                                             lastPiece ++;
                                      }
                                    }
                                    if (lastPiece==0) {
                                      correct = false;
                                    }

                                     if (correct) {
                                      for(let i=0;i<64;i++){

                                        if (nstate[i]=='selected'){
                                             nstate[i] = 'empty';
                                      }
                                    }
                                    if (lastPiece==1) {
                                       text= state.text + ' wins!';
                                     }
                                   else   {turns++;
                                      if (state.text == 'Player 1') {text  = 'Player 2';}
                                      else {text = 'Player 1';}
                                  }
                                }


                                    return {pieces: nstate, phase: 'start', turns: turns, text: text,}
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
