import { BOARD_STATE, COMP_STATE } from '../state/types/game';
import { playAI } from './ai';
import { GamePhase } from './enum';

export const botTurn = (store: any) => {
  const game = store.getState().game;
  if (game) {
    if (
      game.phase === GamePhase.player2Turn &&
      window.location.pathname.includes('vs-computer') // TODO: remove this check
    ) {
      const aiMove = playAI(
        game.pieces,
        game.options.size,
        game.options.difficulty
      );
      console.log('score: ' + aiMove?.[1]);
      store.dispatch({
        type: COMP_STATE,
        payload: { aiMove: aiMove?.[0] },
      });
      setTimeout(() => store.dispatch({ type: BOARD_STATE }), 1000);
    }
  }
};
