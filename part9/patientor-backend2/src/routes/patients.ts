import express from 'express';
import patientService from '../services/patientService';
import { parseNewPatient, parseNewEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof z.ZodError) {
      errorMessage = error.errors.map(e => e.message).join(', ');
    } else if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = parseNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;