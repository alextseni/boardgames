import React from 'react';
import { useSelector } from 'react-redux';
import { GamePhase } from '../../model/enum';
import { State } from '../../state/createStore';
import  './GameInfo.scss';

interface GameInfoProps {
  vsComp?: boolean;
}
export const GameInfo = ({vsComp}: GameInfoProps) => {

  const gamePhase: string = useSelector((state: State)  => state.game.phase)
  const statusText: string = {
    [GamePhase.player1Turn]: `${vsComp ? 'Your turn' : 'Player 1 turn'}`,
    [GamePhase.player2Turn]: 'Player 2 turn',
    [GamePhase.computerTurn]: 'Computer turn',
    [GamePhase.player1Wins]: `${vsComp ? 'You win' : 'Player 1 wins'}!`,
    [GamePhase.player2Wins]: `${vsComp ? 'Computer': 'Player 2'} wins!`,
  }[gamePhase] || '';

  const player1Active =  gamePhase === GamePhase.player1Turn || gamePhase === GamePhase.player1Wins
  return (
    <div className={'gameInfo'}>
      {gamePhase !== GamePhase.gameEnd &&
      <div className={`playerInfo ${player1Active ? 'p1' : 'p2'}`} id={'game-info'}>
        {statusText}
      </div>}
    </div>
 );
};
