import { PieceType } from './enum';

export type Piece = {
  x: number;
  y: number;
  type: PieceType;
};

export type PositionPair = [number, number];
