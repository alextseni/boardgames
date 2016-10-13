
// ------------------------------------
// Constants
// ------------------------------------
export const VIEW_STATE = 'VIEW_STATE';

// ------------------------------------
// Actions
// ------------------------------------
export function changeTheme() {
  return {
    type: VIEW_STATE,
    payload: {},
  };
}

const ACTION_HANDLERS = {
  [VIEW_STATE]: (state, action) => {
    if (state.theme === 'material') {
      return ({
        theme: 'bootstrap',
        toggled: false,
      });
    } else {
      return ({
        theme: 'material',
        toggled: true,
      });
    }
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { theme: 'material', toggled: true };
export default function viewReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
