export const newRegisterInitialState = {
  newRegister: false,
};

export const newRegisterReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_NEWREGISTER":
      return { ...state, newRegister: action.payload.newRegister };

    default:
      return state;
  }
};
