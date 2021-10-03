import { playAI } from './ai'
import { GamePhase } from './enum'

export const botTurn = (store) => {
  const game = store.getState().game
  if (game) {
    if (
      game.phase === GamePhase.player2Turn &&
      window.location.pathname === '/Randix-Game/vsComp'
    ) {
      const aiMove = playAI(
        game.pieces,
        game.options.size,
        game.options.difficulty
      )
      console.log('score: ' + aiMove?.[1])
      store.dispatch({
        type: 'PLAYER_STATE',
        payload: { tag: 'comp', aiMove: aiMove?.[0] },
      })
      setTimeout(() => store.dispatch({ type: 'BOARD_STATE' }), 1000)
    }
  }
}
