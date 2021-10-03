import { combineReducers } from 'redux'
import gameReducer, { GameState } from './game'
export default combineReducers({
  game: gameReducer,
})

export interface Store {
  game: GameState
}
