import { validateCred, validateUser } from '../model/authLogic.js'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_STATE = 'LOGIN_STATE'
export const SIGNUP_STATE = 'SIGNUP_STATE'
export const LOGOUT_STATE = 'LOGOUT_STATE'
export const CLEAN_STATE = 'CLEAN_STATE'

export const HOST_STATE = 'HOST_STATE'
export const LEAVE_STATE = 'LEAVE_STATE'
// ------------------------------------
// Actions
// ------------------------------------
export function logIn(user) {
  return {
    type: LOGIN_STATE,
    payload: user,
  }
}

export function signUp(userInfo) {
  return {
    type: SIGNUP_STATE,
    payload: userInfo,
  }
}

export function logOut() {
  return {
    type: LOGOUT_STATE,
    payload: {},
  }
}

export function cleanForm() {
  return {
    type: CLEAN_STATE,
    payload: {},
  }
}

export function newGame(pwd) {
  return {
    type: HOST_STATE,
    payload: pwd,
  }
}

export function leaveGame() {
  return {
    type: LEAVE_STATE,
    payload: {},
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [LOGIN_STATE]: (state, action) => {
    let upUsers = state.onlineUsers
    let flag = state.flag
    let message = { fail: 'Incorrect username or password' }
    const user = validateUser(action.payload, state.allUsers)
    if (user && state.user.flag != 'in') {
      upUsers = _.concat(state.onlineUsers, user)
      flag = 'in'
      message = {}
    }
    if (state.user.flag == 'in') {
      flag = 'in'
      message = { fail: 'Already logged in!' }
    }
    return {
      ...state,
      onlineUsers: upUsers,
      user: { ...user, flag, reserved: 'no' },
      message,
    }
  },

  [LOGOUT_STATE]: (state, action) => ({
    ...state,
    onlineUsers: _.remove(state.onlineUsers, state.user),
    user: { reserved: 'no', flag: 'out' },
    activeGames: _.remove(state.activeGames, a => {
      state.user.name === a.user.name
    }),
  }),

  [SIGNUP_STATE]: (state, action) => {
    let newUsers = state.allUsers
    let flag = state.flag
    let upUsers = state.onlineUsers
    let user = state.user
    let message = validateCred(action.payload, state.allUsers)
    if (_.isEmpty(message)) {
      newUsers = _.concat(state.allUsers, [{ ...action.payload, rank: 1 }])
      flag = 'in'
      user = { ...action.payload }
      upUsers = _.concat(state.onlineUsers, user)
    }
    return {
      ...state,
      allUsers: newUsers,
      message,
      onlineUsers: upUsers,
      user: { ...user, flag, rank: 1, reserved: 'no' },
    }
  },

  [CLEAN_STATE]: (state, action) => {
    return {
      ...state,
      message: {},
    }
  },

  [HOST_STATE]: (state, action) => {
    if (state.user.flag != 'in') {
      return state
    }
    let isProtected = 'yes'
    if (action.payload == '') {
      isProtected = 'no'
    }
    return {
      ...state,
      user: { ...state.user, reserved: 'yes' },
      activeGames: _.concat(state.activeGames, [
        { user: state.user, pwd: action.payload, isProtected: isProtected },
      ]),
    }
  },

  [LEAVE_STATE]: (state, action) => {
    return {
      ...state,
      user: { ...state.user, reserved: 'no' },
      activeGames: _.remove(state.activeGames, a => {
        state.user.name === a.user.name
      }),
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allUsers: [],
  message: {},
  onlineUsers: [],
  activeGames: [],
  user: { flag: '', reserved: 'no' },
}
export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
