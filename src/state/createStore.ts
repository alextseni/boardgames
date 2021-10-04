import { composeWithDevTools } from 'redux-devtools-extension'
import combinedReducers from './reducers/root-reducer'
import { load, save } from 'redux-localstorage-simple'
import { createStore, applyMiddleware } from 'redux'

import { GameState } from './reducers/game'
import { botTurn } from '../model/engine'
import '../styles/core.scss'

export interface State {
  game: GameState
}

export default (preloadedState: State) => {
  const store = createStore(
    combinedReducers,
    getLoadedState(preloadedState),
    composeWithDevTools(applyMiddleware(save({ states: ['game'] })))
  )
  store.subscribe(() => botTurn(store))
  return store
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
