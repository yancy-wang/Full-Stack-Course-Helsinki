import React, { createContext } from "react";
import { Patient, Diagnosis } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
};

export const initialState: State = {
  patients: {},
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]); 