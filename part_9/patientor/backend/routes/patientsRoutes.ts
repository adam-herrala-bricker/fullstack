import express from 'express';
import { getPatientsNonsensitive, addPatient } from '../services/patientsServices';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatientsNonsensitive());

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