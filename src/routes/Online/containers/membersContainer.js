import { connect } from 'react-redux';
import { newGame, leaveGame } from '../modules/auth';
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */
import { Members as UMembers } from 'components/Online/Members.js';
import { Members_old as UMembers_old } from 'components/Online/Members_old.js';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. */
const mapActionCreators = {
  newGame: (pwd) => newGame(pwd),
  leaveGame: () => leaveGame(),
    };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors.
    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */
export const Members = connect(mapStateToProps, mapActionCreators)(UMembers);
export const Members_old = connect(mapStateToProps, mapActionCreators)(UMembers_old);