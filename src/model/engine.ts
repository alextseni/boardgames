import { BOARD_STATE, COMP_STATE } from '../state/types/game';
import { playAI } from './ai';
import { GamePhase } from './enum';

const delayToShowSelection = 1000;
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
      /* tslint:disable-next-line */
      console.log('score: ' + aiMove.score);
      store.dispatch({
        type: COMP_STATE,
        payload: { aiMove: aiMove.move },
      });
      setTimeout(
        () => store.dispatch({ type: BOARD_STATE }),
        delayToShowSelection
      );
    }
  }
};
