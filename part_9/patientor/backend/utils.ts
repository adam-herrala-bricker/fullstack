import { NewPatientEntry, Gender } from "./types";

//test if something is a string
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (text: string): text is Gender => {
    return Object.values(Gender).map(i => i.toString()).includes(text);
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing entry line(s)');
    }

    return text;
};

const parseGender = (text: unknown): Gender => {
    if (!text || !isString(text) || !isGender(text)) {
        throw new Error('Incorrect or missing gender');
    }

    return text;
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseString(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };

        return newEntry;
    }

    //not all the expected fields are there
    throw new Error('Incorrect data: missing expect field(s)');
};

export default toNewPatientEntry;