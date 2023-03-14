export const userInitialState = {
  userInfo: undefined,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USERINFO":
      return { ...state, userInfo: action.payload.userInfo };

    default:
      return state;
  }
};
