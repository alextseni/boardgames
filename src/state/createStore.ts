import { composeWithDevTools } from 'redux-devtools-extension'
import combinedReducers from './reducers/root-reducer'
import { load, save } from 'redux-localstorage-simple'
import { createStore, applyMiddleware } from 'redux'

import { GameState } from './reducers/game'

export interface State {
  game: GameState
}

export default (preloadedState: State) => {
  return createStore(
    combinedReducers,
    getLoadedState(preloadedState),
    composeWithDevTools(applyMiddleware(save({ states: ['game'] })))
  )
}

const getLoadedState = (preloadedState: State) => {
  if (typeof window !== 'undefined')
    return {
      ...preloadedState,
      ...load({ states: ['game'], disableWarnings: true }),
    }

  return {
    ...preloadedState,
  }
}
