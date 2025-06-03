// import { z } from 'zod';
import { NewPatient, NewPatientSchema, NewEntry, HealthCheckRating, Diagnosis } from './types';

export const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const parseNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object)) {
    throw new Error('Missing entry type');
  }

  switch (object.type) {
    case 'HealthCheck':
      return parseHealthCheckEntry(object);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthcareEntry(object);
    case 'Hospital':
      return parseHospitalEntry(object);
    default:
      throw new Error('Invalid entry type');
  }
};

const parseHealthCheckEntry = (object: object): NewEntry => {
  const requiredFields = ['description', 'date', 'specialist', 'healthCheckRating'];
  for (const field of requiredFields) {
    if (!(field in object)) {
      throw new Error(`Missing field: ${field}`);
    }
  }

  return {
    type: 'HealthCheck',
    description: parseString((object as any).description),
    date: parseDate((object as any).date),
    specialist: parseString((object as any).specialist),
    healthCheckRating: parseHealthCheckRating((object as any).healthCheckRating),
    diagnosisCodes: parseDiagnosisCodes(object)
  };
};

const parseOccupationalHealthcareEntry = (object: object): NewEntry => {
  const requiredFields = ['description', 'date', 'specialist', 'employerName'];
  for (const field of requiredFields) {
    if (!(field in object)) {
      throw new Error(`Missing field: ${field}`);
    }
  }

  const entry: any = {
    type: 'OccupationalHealthcare',
    description: parseString((object as any).description),
    date: parseDate((object as any).date),
    specialist: parseString((object as any).specialist),
    employerName: parseString((object as any).employerName),
    diagnosisCodes: parseDiagnosisCodes(object)
  };

  if ('sickLeave' in object && object.sickLeave) {
    entry.sickLeave = parseSickLeave((object as any).sickLeave);
  }

  return entry;
};

const parseHospitalEntry = (object: object): NewEntry => {
  const requiredFields = ['description', 'date', 'specialist', 'discharge'];
  for (const field of requiredFields) {
    if (!(field in object)) {
      throw new Error(`Missing field: ${field}`);
    }
  }

  return {
    type: 'Hospital',
    description: parseString((object as any).description),
    date: parseDate((object as any).date),
    specialist: parseString((object as any).specialist),
    discharge: parseDischarge((object as any).discharge),
    diagnosisCodes: parseDiagnosisCodes(object)
  };
};

const parseString = (text: unknown): string => {
  if (!text || typeof text !== 'string') {
    throw new Error('Incorrect or missing string');
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || typeof date !== 'string' || !Date.parse(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect sick leave data');
  }

  if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Missing sick leave dates');
  }

  return {
    startDate: parseDate((sickLeave as any).startDate),
    endDate: parseDate((sickLeave as any).endDate)
  };
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect discharge data');
  }

  if (!('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Missing discharge information');
  }

  return {
    date: parseDate((discharge as any).date),
    criteria: parseString((discharge as any).criteria)
  };
};