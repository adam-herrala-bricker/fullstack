import express from 'express';
import { getPatientsNonsensitive, getSingleNonsensitive, addPatient } from '../services/patientsServices';
import toNewPatientEntry from '../utils';

const router = express.Router();

//return all patients
router.get('/', (_req, res) => {
    res.send(getPatientsNonsensitive());

});

//return single patient
router.get('/:id', (req, res) => {
    try {
        const thisPatient = getSingleNonsensitive(req.params.id);
        res.send(thisPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
        } else {
            res.status(404).json({error: "an unknown error has occured"});
        } 
    }
});

router.post('/', (req, res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);
        const addedEntry = addPatient(newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).json({error: "an unknown error has occured"});
        }
    }
});

export default router;