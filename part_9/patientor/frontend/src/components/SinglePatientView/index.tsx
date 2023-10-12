import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import { Male, Female } from '@mui/icons-material';

import { Patient } from '../../types';
import patientServices from '../../services/patients';

const SinglePatientView = () => {
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
        <div className = 'single-container'>
            <div className='flex-row'>
                <Typography variant = 'h5' component = 'h2'>{thisPatient.name}</Typography>
                {thisPatient.gender === 'male' && <Male />}
                {thisPatient.gender === 'female' && <Female />}
            </div>
            <div><b>ssn: </b>{thisPatient.ssn}</div>
            <div><b>occupation: </b>{thisPatient.occupation}</div>
        </div>
    );
};

export default SinglePatientView;