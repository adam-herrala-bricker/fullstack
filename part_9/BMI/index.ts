import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()
app.use(express.json())

//underscore lets the compiler know there's an unused variable there, but you can't remove it
app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!')
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    const bmiCategory = calculateBmi(Number(height), Number(weight))

    //doing it this way bc throwing an error in bmiCalculator crashes the server
    if (bmiCategory === 'error') {
        res.status(400).json({error: "malformatted parameters"})
    } else {
        res.json({
            weight,
            height,
            bmi: calculateBmi(Number(height), Number(weight))})
    }
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})