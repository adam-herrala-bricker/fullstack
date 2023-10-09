import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatientData, NewPatientEntry } from '../types';

const patients = patientsData;

//not actually used in app. here for illustration only
export const getPatients = (): Patient[] => {
    return patients;
};

export const getPatientsNonsensitive = (): NonSensitivePatientData[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({

        id, name, dateOfBirth, gender, occupation
    }));
};

export const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatient: Patient = { ...entry, id : uuid()};
    
    patients.push(newPatient);

    return newPatient;

};


