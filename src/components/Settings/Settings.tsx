import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../library/Dropdown';
import { BoardSize, Difficulty, GamePhase } from '../../model/enum';
import {
  changeBoard,
  changeDifficulty,
  initializeBoard,
} from '../../state/actions/game';
import { State } from '../../state/createStore';
import styles from './Settings.module.scss';

interface SettingsProps {
  hasDifficultySetting?: boolean;
  hasSizeSetting?: boolean;
}
export const Settings = ({
  hasDifficultySetting,
  hasSizeSetting,
}: SettingsProps) => {
  const boardSize = useSelector((state: State) => state.game.options.size);
  const boardMode = useSelector(
    (state: State) => state.game.options.difficulty
  );
  const gamePhase = useSelector((state: State) => state.game.phase);
  const dispatch = useDispatch();

  const difficultyOptions = [
    { value: Difficulty.easy, label: 'Easy' },
    { value: Difficulty.normal, label: 'Normal' },
    { value: Difficulty.hard, label: 'Hard' },
  ];
  const sizeOptions = [
    { value: BoardSize.small, label: '4x4' },
    { value: BoardSize.medium, label: '5x5' },
    { value: BoardSize.big, label: '6x6' },
  ];

  return (
    <div className={styles.settings}>
      {Boolean(hasSizeSetting) && (
        <Dropdown
          label={'Board size'}
          className={styles.customDropdown}
          id={'board-size'}
          options={sizeOptions}
          selectedOption={sizeOptions.find(o => o.value === boardSize)!}
          onChange={(value: string) => {
            dispatch(changeBoard(value as BoardSize));
            if (gamePhase !== GamePhase.gameEnd) {
              dispatch(initializeBoard(value));
            }
          }}
        />
      )}
      {Boolean(hasDifficultySetting) && (
        <Dropdown
          label={'Difficulty'}
          id={'difficulty'}
          selectedOption={difficultyOptions.find(o => o.value === boardMode)!}
          options={difficultyOptions}
          onChange={(value: string) => {
            dispatch(changeDifficulty(value as Difficulty));
            if (gamePhase !== GamePhase.gameEnd) {
              dispatch(initializeBoard(value));
            }
          }}
        />
      )}
    </div>
  );
};
