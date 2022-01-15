import classnames from 'classnames';
import React from 'react';
import { GamePhase } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import * as styles from './GameInfo.module.scss';

interface GameInfoProps {
  vsComp?: boolean;
}
export const GameInfo = ({ vsComp }: GameInfoProps) => {
  const { phase } = useGameState();
  const statusText: string =
    {
      [GamePhase.player1Turn]: `${vsComp ? 'Your turn' : 'Player 1 turn'}`,
      [GamePhase.player2Turn]: 'Player 2 turn',
      [GamePhase.computerTurn]: 'Computer turn',
      [GamePhase.player1Wins]: `${vsComp ? 'You win' : 'Player 1 wins'}!`,
      [GamePhase.player2Wins]: `${vsComp ? 'Computer' : 'Player 2'} wins!`,
    }[phase as string] || '';

  const player1Active =
    phase === GamePhase.player1Turn || phase === GamePhase.player1Wins;
  return (
    <div className={styles.gameInfo}>
      {phase !== GamePhase.gameEnd && (
        <div
          className={classnames(styles.playerInfo, {
            [styles.p1]: player1Active,
            [styles.p2]: !player1Active,
          })}
          id={'game-info'}>
          {statusText}
        </div>
      )}
    </div>
  );
};
