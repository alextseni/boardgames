import { injectReducer, makeRootReducer } from '../../store/reducers';

export default (store) => ({
  path: '/Randix-Game/Online',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Game = require('./components/Game').Game;
      const reducer1 = require('./modules/game').default;
      const reducer2 = require('./modules/auth').default;
      /*  Add the reducer to the store on key 'game'  */
      injectReducer(store, { key: 'game', reducer: reducer1});
      injectReducer(store, { key:'auth', reducer: reducer2 });
      /*  Return getComponent   */
      cb(null, Game);
      /* Webpack named bundle   */
    }, 'Game');
  },
});
