import React, { useReducer, useContext } from "react";
import { State, initialState, StateContext } from "./typesAndContext";
import { Action, reducer } from "./reducer";

type StateProviderProps = {
  children: React.ReactNode;
};

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);
  console.log('StateProvider providing value:', [state, dispatch]);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);