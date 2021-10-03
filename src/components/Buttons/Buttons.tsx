import React from 'react';
import ButtonSound from '../../assets/button.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard, initializeBoard } from '../../state/actions/game';
import { GamePhase } from '../../model/enum';
import { Button } from '../../library/Button';

const play = (sound: any) => {
  sound.pause(); sound.currentTime = 0; sound.play();
};

export const Buttons = () => {
  const boardSize = useSelector((state) => state.game.options.size)
  const gamePhase = useSelector((state) => state.game.phase)
  const dispatch = useDispatch();
  
  const newGame = () => {
    play(document.getElementById('buttonSound'));
    dispatch(initializeBoard(boardSize));
  };

  const guitGame = () => {
    play(document.getElementById('buttonSound'));
    dispatch(clearBoard());
  };

  return (
    <div>
      <audio id="buttonSound" src={ButtonSound} />
      <Button label={'New game'} onClick={newGame} />
      {gamePhase !== GamePhase.gameEnd && <Button label={'Quit'} onClick={guitGame} />}
    </div>
);
};