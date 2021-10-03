import React from 'react';
import { useSelector } from 'react-redux';
import { GamePhase } from '../../model/enum';
import  './GameInfo.scss';

export const GameInfo = () => {

  const gamePhase: string = useSelector((state) => state.game.phase)
  const statusText: string = {
    [GamePhase.player1Turn]: `Player 1 turn`,
    [GamePhase.player2Turn]: `Player 2 turn`,
    [GamePhase.player1Wins]: `Player 1 wins!`,
    [GamePhase.player2Wins]: `Player 2 wins!`,
  }[gamePhase] || '';

  return (
    <div className={gamePhase}>
      {gamePhase !== GamePhase.gameEnd &&
      <span className={`info ${gamePhase === GamePhase.player1Turn || gamePhase === GamePhase.player1Wins ? 'p1' : 'p2'}`} id={'game-info'}>
        {statusText}
      </span>}
    </div>
 );
};

