import { State } from "./typesAndContext";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { patientId: string; entry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  console.log('Reducer received state:', state);
  console.log('Reducer received action:', action);

  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log('Reducer handling SET_PATIENT_LIST');
      const newStateSetList = {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      console.log('Reducer returning new state (SET_PATIENT_LIST):', newStateSetList);
      return newStateSetList;

    case "ADD_PATIENT":
      console.log('Reducer handling ADD_PATIENT');
      const newStateAddPatient = {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      console.log('Reducer returning new state (ADD_PATIENT):', newStateAddPatient);
      return newStateAddPatient;

    case "SET_PATIENT":
      console.log('Reducer handling SET_PATIENT');
      const newStateSetPatient = {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      console.log('Reducer returning new state (SET_PATIENT):', newStateSetPatient);
      return newStateSetPatient;

    case "SET_DIAGNOSES":
      console.log('Reducer handling SET_DIAGNOSES');
      const newStateSetDiagnoses = {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
      console.log('Reducer returning new state (SET_DIAGNOSES):', newStateSetDiagnoses);
      return newStateSetDiagnoses;

    case "ADD_ENTRY":
      console.log('Reducer handling ADD_ENTRY');
      const patient = state.patients[action.payload.patientId];
      if (patient) {
        const updatedPatient = {
          ...patient,
          entries: [...patient.entries, action.payload.entry]
        };
        const newStateAddEntry = {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.patientId]: updatedPatient
          }
        };
        console.log('Reducer returning new state (ADD_ENTRY):', newStateAddEntry);
        return newStateAddEntry;
      }
      console.log('Reducer returning current state (ADD_ENTRY, patient not found):', state);
      return state;

    default:
      console.log('Reducer received unknown action:', action);
      console.log('Reducer returning current state (unknown action):', state);
      return state;
  }
};