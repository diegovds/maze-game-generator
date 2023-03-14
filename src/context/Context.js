import { createContext, useReducer } from "react";

import { userInitialState, userReducer } from "../reducers/userReducer";

const initialState = {
  user: userInitialState,
};

export const Context = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
});

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
