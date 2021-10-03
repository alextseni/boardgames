export enum GamePhase {
  player1Turn = 'pl1_turn',
  player2Turn = 'pl2_turn',

  computerTurn = 'com_turn',

  player2Wins = 'pl2_wins',

  player1Wins = 'pl1_wins',

  gameEnd = 'game_end',
  gamestart = 'game_start',
}

export enum PieceType {
  obstacle = 'obstacle',
  piece = 'piece',
  empty = 'empty',

  selected = 'selected',
}

export enum Difficulty {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
}

export enum BoardSize {
  small = '4',
  medium = '5',
  big = '6',
}
