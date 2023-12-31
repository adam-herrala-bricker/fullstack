import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import { Male, Female } from '@mui/icons-material';

import { Patient, Diagnosis, Entry, OccupationalHealthEntry, HealthCheckEntry } from '../../types';
import patientServices from '../../services/patients';

//helper function
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const HospitalEntry = () => {
    return(
       null
    );
};

const OccupationalEntry = ({entry}: {entry: OccupationalHealthEntry}) => {
    return(
        <div>
            employer: {entry.employerName}
        </div>
    );
};

const HealthcheckEntry = ({entry}: {entry: HealthCheckEntry}) => {
    return(
        <div>
            healthcheck rating: {entry.healthCheckRating}
        </div>
    );
};

//completely unnecessary prop drilling using this structure, so we're going to skip making it look nice
const EntryDetails = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry />;
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry = {entry} />;
        case 'HealthCheck':
            return <HealthcheckEntry entry = {entry} />;
        default:
            return assertNever(entry);
    }
};

const Entries = ( { thisPatient, diagnoses }: {thisPatient: Patient, diagnoses: Diagnosis[]}) => {

    if (!thisPatient.entries || thisPatient.entries.length < 1) {
        return null;
    }

    return(
        <div>
            <Typography variant = 'h5' component = 'h2'>Entries</Typography>
            {thisPatient.entries.map(i => 
                <div key = {i.date}>
                    <div>{i.date}: {i.description}</div>
                    <div>{i.type}</div>
                    <div>specialist: {i.specialist}</div>
                    <EntryDetails entry = {i} />
                    <ul>
                    {i.diagnosisCodes?.map(j => 
                        <li key = {j}>{j}: {diagnoses.find(k => k.code === j)?.name}</li>)}
                    </ul>
                </div>
                )}
        </div>
        
    );
};

const SinglePatientView = ({ diagnoses }: {diagnoses: Diagnosis[]}) => {
    const [thisPatient, setThisPatient] = useState<Patient | null>(null);
    const id = useParams().id as string;

    useEffect(() => {
        const fetchData = async () => {
            const thisData = await patientServices.getOne(id);
            setThisPatient(thisData);
        };
        fetchData();
    }, [id]);

    if (!thisPatient) {
        return null;
    }

    return(
        <div>
            <div className = 'single-container'>
                <div className='flex-row'>
                    <Typography variant = 'h5' component = 'h2'>{thisPatient.name}</Typography>
                    {thisPatient.gender === 'male' && <Male />}
                    {thisPatient.gender === 'female' && <Female />}
                </div>
                <div><b>ssn: </b>{thisPatient.ssn}</div>
                <div><b>occupation: </b>{thisPatient.occupation}</div>
            </div>
            <div className = 'single-container'>
                <Entries thisPatient = {thisPatient} diagnoses = {diagnoses}/>
            </div>
        </div>
    );
};

export default SinglePatientView;