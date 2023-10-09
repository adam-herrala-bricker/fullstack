import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../types';

//not actually used in app. here for illustration only
export const getPatients = (): Patient[] => {
    return patientsData;
};

export const getPatientsNonsensitive = (): NonSensitivePatientData[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({

        id, name, dateOfBirth, gender, occupation
    }));
};


