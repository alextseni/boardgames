import { connect } from 'react-redux'
import { initializeBoard } from '../modules/game'
import { clearBoard } from '../modules/game'
import { markPiece } from '../modules/game'
import {removePieces} from '../modules/game'
import {removeMarks} from '../modules/game'

import {ROWS} from '../modules/game'
import {COLUMNS} from '../modules/game'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */

import Game from 'components/Game'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. */

const mapActionCreators = {
    initializeBoard: () => {let random = new Array(46);
                            return initializeBoard(random.fill(0,0,ROWS*COLUMNS).map(n => Math.random()))},
    clearBoard: () => clearBoard(),
    markPiece: (cell) => markPiece(cell),
    removePieces: () => removePieces(),
    removeMarks: () => removeMarks(),
}

const mapStateToProps = (state) => ({
  game: state.game,

})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors.
    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Game)
