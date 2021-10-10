import { useDispatch, useSelector } from 'react-redux';
import {
  clearBoard as clearBoardAction,
  initializeBoard as initializeBoardAction,
  markPiece as markPieceAction,
  removePieces as removePiecesAction,
} from '../actions/game';
import { State } from '../createStore';

export const useGameState = () => {
  const dispatch = useDispatch();

  const phase = useSelector((state: State) => state.game.phase);
  const pieces = useSelector((state: State) => state.game.pieces);

  const removePieces = () => {
    dispatch(removePiecesAction());
  };

  const markPiece = (piece: number) => {
    dispatch(markPieceAction(piece));
  };

  const initializeBoard = (size: number) => {
    dispatch(initializeBoardAction(size));
  };

  const clearBoard = () => {
    dispatch(clearBoardAction());
  };

  return {
    phase,
    pieces,
    removePieces,
    markPiece,
    clearBoard,
    initializeBoard,
  };
};
