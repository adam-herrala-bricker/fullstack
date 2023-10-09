import express from 'express';
import { getPatientsNonsensitive } from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getPatientsNonsensitive());

});

export default router;