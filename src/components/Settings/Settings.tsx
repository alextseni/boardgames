import React from 'react';
import { Dropdown } from '../../library/Dropdown';
import { BoardSize, Difficulty, GamePhase } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import * as styles from './Settings.module.scss';

interface SettingsProps {
  hasDifficultySetting?: boolean;
  hasSizeSetting?: boolean;
}
export const Settings = ({
  hasDifficultySetting,
  hasSizeSetting,
}: SettingsProps) => {
  const { size, difficulty, changeBoard, changeDifficulty } = useOptions();
  const { phase, initializeBoard } = useGameState();

  const difficultyOptions = [
    { value: Difficulty.easy, label: 'Easy' },
    { value: Difficulty.normal, label: 'Normal' },
    { value: Difficulty.hard, label: 'Hard' },
  ];
  const sizeOptions = [
    { value: `${BoardSize.small}`, label: '4x4' },
    { value: `${BoardSize.medium}`, label: '5x5' },
    { value: `${BoardSize.big}`, label: '6x6' },
  ];

  return (
    <div className={styles.settings}>
      {Boolean(hasSizeSetting) && (
        <Dropdown
          label={'Board size'}
          className={styles.customDropdown}
          id={'board-size'}
          options={sizeOptions}
          selectedOption={sizeOptions.find(o => o.value === size.toString())!}
          onChange={(value: string) => {
            const boardSize = parseInt(value, 10);
            changeBoard(boardSize);
            if (phase !== GamePhase.gameEnd) {
              initializeBoard(boardSize);
            }
          }}
        />
      )}
      {Boolean(hasDifficultySetting) && (
        <Dropdown
          label={'Difficulty'}
          id={'difficulty'}
          selectedOption={difficultyOptions.find(o => o.value === difficulty)!}
          options={difficultyOptions}
          onChange={(value: string) => {
            changeDifficulty(value as Difficulty);
            if (phase !== GamePhase.gameEnd) {
              initializeBoard(size);
            }
          }}
        />
      )}
    </div>
  );
};
