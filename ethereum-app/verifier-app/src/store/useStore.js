import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

import { pageInitialState, pageActions } from "./page";
import { viewInitialState, viewActions } from "./view";

const initialState = {
  ...pageInitialState,
  ...viewInitialState
};

const StoreContext = createContext(initialState);

const Actions = {
  ...pageActions,
  ...viewActions
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const update = act(state);
  return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
