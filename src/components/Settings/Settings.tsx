import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from '../../library/Dropdown'
import { BoardSize, Difficulty, GamePhase } from '../../model/enum'
import { changeBoard, changeDifficulty, initializeBoard } from '../../state/actions/game'
import './Settings.scss'

interface SettingsProps {
  hasDifficultySetting?: boolean;
  hasSizeSetting?: boolean;
}
export const Settings = ({
  hasDifficultySetting,
  hasSizeSetting
}: SettingsProps) => {
  const boardSize = useSelector((state) => state.game.options.size)
  const boardMode = useSelector((state) => state.game.options.difficulty)
  const gamePhase = useSelector((state) => state.game.phase)
  const dispatch = useDispatch();

  const difficultyOptions = [{value: Difficulty.easy, label: 'Easy'}, {value: Difficulty.normal, label: 'Normal'}, {value: Difficulty.hard, label: 'Hard'}]
  const sizeOptions = [{value: BoardSize.small, label: '4x4'}, {value: BoardSize.medium, label: '5x5'}, {value: BoardSize.big, label: '6x6'}]
  if (gamePhase === GamePhase.gameEnd) {
    return null;
  }
  return (
    <div className={'settings'}>
      {Boolean(hasSizeSetting) && <Dropdown
      label={'Board size'}
      id={'board-size'}
        options={sizeOptions}
        selectedOption={sizeOptions.find(o => o.value === boardSize)!}
        onChange={(value: string) => {
          dispatch(changeBoard(value))
          dispatch(initializeBoard(value))
        }}
      />}
      {Boolean(hasDifficultySetting) && 
      <Dropdown
      label={'Difficulty'}
      id={'difficulty'}
      selectedOption={difficultyOptions.find(o => o.value === boardMode)!}
        options={difficultyOptions}
        onChange={(value: string) => {
          dispatch(changeDifficulty(value))
          dispatch(initializeBoard(boardSize))
        }}
      />
}
    </div>
  )
}
