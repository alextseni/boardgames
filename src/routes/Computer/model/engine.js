import { playAI } from 'routes/Computer/model/ai';

export const botTurn = (store) => {
  let game = store.getState().game;
  if (game) {
    if (game.phase === 'player2Move' && window.location.pathname === '/Randix-Game/vsComp') {
      const aiMove = playAI(game.pieces, game.options.size, game.options.difficulty);
      console.log('score: ' + aiMove[1]);
      store.dispatch({ type: 'COMP_STATE', payload: { tag: 'comp', aiMove: aiMove[0] } });
    }

    if (game.phase === 'player2End' && window.location.pathname === '/Randix-Game/vsComp') {
      setTimeout(() => store.dispatch({ type: 'BOARD_STATE' }), 1000);
    }
  }
};
