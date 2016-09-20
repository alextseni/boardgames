import { connect } from 'react-redux';
import { GameInfo as DGameInfo } from 'components/Game';
import { GameInfo_old as DGameInfo_old } from 'components/Game';
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */
/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. */

const mapStateToProps = (state) => ({
  game: state.game,
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors.
    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export const GameInfo = connect(mapStateToProps, null)(DGameInfo);
export const GameInfo_old = connect(mapStateToProps, null)(DGameInfo_old);
