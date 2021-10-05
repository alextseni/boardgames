import {
  BOARD_STATE,
  COMP_STATE,
  END_STATE,
  OPTIONS_STATE,
  PLAYER_STATE,
  START_STATE,
} from '../types/game';
import { evaluateSelection, updateSelectionState } from '../../model/gameLogic';
import { BoardSize, Difficulty, GamePhase } from '../../model/enum';
import { Piece } from '../../model/types';

export interface GameState {
  pieces: Piece[];
  phase: GamePhase;
  allMarbles: number;
  options: { difficulty: Difficulty; size: BoardSize };
}

export const initialState = {
  pieces: [],
  phase: GamePhase.gameEnd,
  allMarbles: 0,
  options: { difficulty: Difficulty.normal, size: BoardSize.medium },
};

interface Action {
  type?: string;
  payload?: any;
}

const reducer = (
  state: GameState = initialState,
  action: Action = {}
): GameState => {
  const { type, payload } = action;

  switch (type) {
    case START_STATE:
      return {
        ...state,
        ...payload,
      };

    case END_STATE:
      return {
        ...state,
        pieces: [],
        phase: GamePhase.gameEnd,
        allMarbles: 0,
      };

    case PLAYER_STATE:
      return {
        ...state,
        pieces: updateSelectionState(state.pieces, action.payload),
      };

    case COMP_STATE:
      return {
        ...state,
        phase: GamePhase.computerTurn,
        pieces: updateSelectionState(state.pieces, action.payload),
      };

    case BOARD_STATE:
      return evaluateSelection(state);

    case OPTIONS_STATE: {
      return {
        ...state,
        options: {
          ...state.options,
          ...payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
