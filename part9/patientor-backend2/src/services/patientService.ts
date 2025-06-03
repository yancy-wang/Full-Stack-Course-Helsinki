import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, entries, ...rest }) => rest);
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntryToPatient
};