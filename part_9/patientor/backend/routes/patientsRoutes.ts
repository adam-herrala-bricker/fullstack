import express from 'express';
import { getPatientsNonsensitive, addPatient } from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatientsNonsensitive());

});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body
    const addedEntry = addPatient(name, dateOfBirth, ssn, gender, occupation);
    res.send(addedEntry);
});

export default router;