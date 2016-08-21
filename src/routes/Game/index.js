import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: '/Randix-Game/dist/game',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Game = require('./containers/boardContainer').game;
      const Buttons = require('./containers/boardContainer').buttons;
      const GameInfo = require('./containers/boardContainer').gameInfo;
      const Board = require('./containers/boardContainer').board;

      const reducer = require('./modules/game').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'game', reducer });

      /*  Return getComponent   */
      cb(null, Game);
      cb(null, Buttons);
      cb(null, GameInfo);
      cb(null, Board);

      /* Webpack named bundle   */
    }, 'game');
  },
});
