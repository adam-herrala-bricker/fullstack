import express from 'express';
import diagnosesRouter from './routes/diagnosesRoutes';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
