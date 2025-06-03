import React, { createContext, useContext, useReducer } from 'react';
import { Patient, Diagnosis, Entry } from './types';

// Define the state shape
export type State = {
  patients: Patient[];
  diagnoses: Diagnosis[];
};

// Define action types
export type Action = | { type: "SET_PATIENT_LIST"; payload: Patient[] } | { type: "SET_DIAGNOSES"; payload: Diagnosis[] } | { type: "ADD_PATIENT"; payload: Patient } | { type: "SET_PATIENT"; payload: Patient } | { type: "ADD_ENTRY"; payload: { patientId: string; entry: Entry } };

// Define the reducer function
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return { ...state, patients: action.payload };
    case "ADD_PATIENT":
      return { ...state, patients: state.patients.concat(action.payload) };
    case "SET_DIAGNOSES":
      return { ...state, diagnoses: action.payload };
    case "SET_PATIENT":
      return { ...state, patients: state.patients.map(patient => patient.id === action.payload.id ? action.payload : patient) };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.patientId
            ? { ...patient, entries: patient.entries.concat(action.payload.entry) }
            : patient
        )
      };
    default:
      return state;
  }
};

// Create the context
export const StateContext = createContext<[State, React.Dispatch<Action>]>([/* initialState */ { patients: [], diagnoses: [] }, () => null]);

// Create the StateProvider component
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { patients: [], diagnoses: [] });
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Create the hook for accessing the state
export const useStateValue = () => useContext(StateContext); 