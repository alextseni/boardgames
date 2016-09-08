const checkState(state) {
  if (state.text === "Player1" || state.text.substring(8,13) === "wins!") {
    return true;
  }
}

const playAI (state) {
   if (checkState(state)) {
     return state;
   }
   else {
     const remainingMarbles = state.pieces.filter(p => (p.type === 'marble')).length;

   }

}
