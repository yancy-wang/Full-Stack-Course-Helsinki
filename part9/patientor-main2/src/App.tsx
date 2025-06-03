import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state/state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();

  console.log('App component rendered');

  React.useEffect(() => {
    console.log('useEffect triggered');
    void axios.get<void>(`${apiBaseUrl}/ping`)
      .then(() => console.log('Ping successful'))
      .catch((e) => console.error('Ping failed:', e));

    const fetchPatientList = async () => {
      console.log('Fetching patient list...');
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        console.log('Fetched patients:', patientListFromApi);
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        console.log('Dispatched SET_PATIENT_LIST');
      } catch (e) {
        console.error('Error fetching patient list:', e);
      }
    };
    
    const fetchDiagnosesList = async () => {
      console.log('Fetching diagnoses list...');
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        console.log('Fetched diagnoses:', diagnosesFromApi);
        dispatch({ type: "SET_DIAGNOSES", payload: diagnosesFromApi });
        console.log('Dispatched SET_DIAGNOSES');
      } catch (e) {
        console.error('Error fetching diagnoses list:', e);
      }
    };
    
    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;