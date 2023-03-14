import { createContext, useReducer } from "react";

import {
  newRegisterInitialState,
  newRegisterReducer,
} from "../reducers/newRegisterReducer";
import { userInitialState, userReducer } from "../reducers/userReducer";

const initialState = {
  user: userInitialState,
  newRegister: newRegisterInitialState,
};

export const Context = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  newRegister: newRegisterReducer(state.newRegister, action),
});

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
