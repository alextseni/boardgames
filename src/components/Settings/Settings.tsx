import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from '../../library/Dropdown'
import { BoardSize, Difficulty } from '../../model/enum'
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
  const gamePhase = useSelector((state) => state.game.phase)
  const dispatch = useDispatch();

  const difficultyOptions = [{value: Difficulty.easy, label: 'Easy'}, {value: Difficulty.normal, label: 'Normal'}, {value: Difficulty.hard, label: 'Hard'}]
  const sizeOptions = [{value: BoardSize.small, label: '4x4'}, {value: BoardSize.medium, label: '5x5'}, {value: BoardSize.big, label: '6x6'}]
  return (
    <div className={`${gamePhase} ${'settings'}`}>
      {Boolean(hasSizeSetting) && <Dropdown
      label={'Board size'}
      key={'board-size'}
        options={sizeOptions}
        onChange={(value: number) => {
          dispatch(changeBoard(value))
          dispatch(initializeBoard(value))
        }}
      />}
      {Boolean(hasDifficultySetting) && 
      <Dropdown
      label={'Difficulty'}
      key={'difficulty'}
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
