import { useState, useEffect } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { apiBaseUrl } from "../../constants";

import { useStateValue } from "../../state";

const PatientListPage = () => {

  const [{ patients }, dispatch] = useStateValue();

  console.log('PatientListPage: Patients object in state:', patients);
  console.log('PatientListPage: Patient object keys:', Object.keys(patients));
  console.log('PatientListPage: Type of patients:', Array.isArray(patients) ? 'Array' : typeof patients);

  useEffect(() => {
    console.log('PatientListPage useEffect triggered');
    const isPatientsEmpty = !patients || (typeof patients === 'object' && Object.keys(patients).length === 0 && !Array.isArray(patients)) || (Array.isArray(patients) && patients.length === 0);

    if (isPatientsEmpty) {
      console.log('PatientListPage: Patients state is empty, refetching...');
      const fetchPatientList = async () => {
        try {
          const { data: patientListFromApi } = await axios.get<Patient[]>(
            `${apiBaseUrl}/patients`
          );
          console.log('PatientListPage: fetched patients:', patientListFromApi);
          dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
          console.log('PatientListPage: dispatched SET_PATIENT_LIST');
        } catch (e) {
          console.error('PatientListPage: error fetching patient list:', e);
        }
      };
      void fetchPatientList();
    } else {
       console.log('PatientListPage: Patients state is not empty.', patients);
    }
  }, [patients, dispatch]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      dispatch({ type: "ADD_PATIENT", payload: patient });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // Prepare the patient list for rendering, handle both object and array cases
  const patientListToRender: Patient[] = patients && typeof patients === 'object' && !Array.isArray(patients)
    ? Object.values(patients) as Patient[]
    : Array.isArray(patients) ? patients : [];

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientListToRender.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {patientListToRender.length === 0 && (
        <Typography align="center">Loading patients or no patients found...</Typography>
      )}

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
