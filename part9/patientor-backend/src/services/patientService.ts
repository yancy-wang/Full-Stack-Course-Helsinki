import patients from '../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsPublic = (): PublicPatient[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsPublic,
  addPatient
};