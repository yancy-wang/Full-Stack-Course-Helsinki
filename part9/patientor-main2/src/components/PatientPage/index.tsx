import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

import { Gender, Entry, Diagnosis, Patient } from "../../types";
import { useStateValue } from "../../state";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const patient = id ? patients.find(p => p.id === id) : undefined;

  console.log('PatientPage: patient object from state:', patient);
  if (patient) {
    console.log('PatientPage: patient entries:', patient.entries);
    console.log('PatientPage: Type of patient entries:', Array.isArray(patient.entries) ? 'Array' : typeof patient.entries);
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id && (!patientDetails || !patientDetails.ssn)) {
        console.log('PatientPage useEffect: Fetching full patient data...');
        try {
          const fetchedPatient = await patientService.getById(id);
          console.log('PatientPage useEffect: fetchedPatient:', fetchedPatient);
          dispatch({ type: "SET_PATIENT", payload: fetchedPatient });
          setPatientDetails(fetchedPatient);
          console.log('PatientPage useEffect: dispatched SET_PATIENT');
        } catch (e) {
          console.error('PatientPage useEffect: error fetching patient:', e);
        }
      } else if (patientDetails && patientDetails.ssn) {
        console.log('PatientPage useEffect: Full patient data already available.', patientDetails);
      } else if (id) {
        console.log('PatientPage useEffect: ID exists but no patient details available.');
      }
      if (patient && patient.ssn && (!patientDetails || patient.id !== patientDetails.id)) {
        console.log('PatientPage useEffect: Global state patient updated, syncing to local state.', patient);
        setPatientDetails(patient);
      }
    };
    void fetchPatient();
  }, [dispatch, id, patient, patientDetails]);

  const submitNewEntry = async (values: Omit<Entry, "id">) => {
    if (!id || !patientDetails) return;
    
    try {
      const entry = await patientService.createEntry(id, values);
      setPatientDetails((prevDetails: Patient | null) => {
        if (!prevDetails) return null;
        return { ...prevDetails, entries: [...prevDetails.entries, entry] };
      });
      dispatch({ type: "ADD_ENTRY", payload: { patientId: id, entry } });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <Transgender />;
      default:
        return null;
    }
  };

  const diagnosesMap = diagnoses.reduce((map, diagnosis) => {
    map[diagnosis.code] = diagnosis;
    return map;
  }, {} as { [code: string]: Diagnosis });

  const entriesToRender = patientDetails && patientDetails.entries ? patientDetails.entries : [];

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient Information
        </Typography>
      </Box>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        {patient.name} {getGenderIcon(patient.gender)}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      
      <Box style={{ marginTop: "1em" }}>
        <Typography variant="h6">entries</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
        
        {entriesToRender.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnosesMap} />
        ))}
      </Box>
      
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;