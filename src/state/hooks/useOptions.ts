import { useDispatch, useSelector } from 'react-redux';
import { Difficulty } from '../../model/enum';
import {
  changeBoard as changeBoardAction,
  changeDifficulty as changeDifficultyAction,
} from '../actions/game';
import { State } from '../createStore';

export const useOptions = () => {
  const dispatch = useDispatch();

  const size = useSelector((state: State) => state.game.options.size);
  const difficulty = useSelector(
    (state: State) => state.game.options.difficulty
  );

  const changeDifficulty = (mode: Difficulty) => {
    dispatch(changeDifficultyAction(mode));
  };

  const changeBoard = (boardSize: number) => {
    dispatch(changeBoardAction(boardSize));
  };

  return {
    size,
    difficulty,
    changeBoard,
    changeDifficulty,
  };
};
