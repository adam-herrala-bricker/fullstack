import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, numberCheck } from './exerciseCalculator';

const app = express();
app.use(express.json());

//underscore lets the compiler know there's an unused variable there, but you can't remove it
app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const bmiCategory = calculateBmi(Number(height), Number(weight));

    //doing it this way bc throwing an error in bmiCalculator crashes the server
    if (bmiCategory === 'error') {
        res.status(400).json({error: "malformatted parameters"});
    } else {
        res.json({
            weight,
            height,
            bmi: calculateBmi(Number(height), Number(weight))});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { log , target } = req.body;

    if (!log || !target) {
        res.status(400).json({error: "parameters missing"});
    }

    if (!numberCheck(log as string[])) {
        res.status(400).json({error: "hours logged must be in range [0,24]"});
    }

    try {
        const output = calculateExercise(log as number[], target as number);
        res.json({output});
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).json({error: "malformatted inputs"});
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});