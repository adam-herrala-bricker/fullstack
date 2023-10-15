import { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

//import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import diagnosisServices from './services/diagnoses';
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import SinglePatientView from "./components/SinglePatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  //get patient data
  useEffect(() => {
    //void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    //void returned undefined, which ts needs to happen for these functions?
    void fetchPatientList();
  }, []);

  //get diagnosis data
  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const data = await diagnosisServices.getAll();
      setDiagnoses(data);
    };

    void fetchDiagnosisList();

  });
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Typography variant="h3" style={{ marginTop: "0.5em" }}>
            Patientor
          </Typography>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element = {<SinglePatientView diagnoses = {diagnoses}/>}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
