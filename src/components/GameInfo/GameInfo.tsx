import React from 'react';
import { useSelector } from 'react-redux';
import { GamePhase } from '../../model/enum';
import  './GameInfo.scss';

export const GameInfo = () => {

  const gamePhase: string = useSelector((state) => state.game.phase)
  const statusText: string = {
    [GamePhase.player1Turn]: `Player 1 turn`,
    [GamePhase.player2Turn]: `Player 2 turn`,
  }[gamePhase] || '';

  return (
    <div className={gamePhase}>
      {gamePhase !== GamePhase.gameEnd &&
      <span className={`info ${GamePhase.player1Turn ? 'p1' : 'p2'}`} id={'game-info'}>
        {statusText}
      </span>}
    </div>
 );
};

