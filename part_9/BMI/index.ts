import express from 'express'
const app = express()

//underscore lets the compiler know there's an unused variable there, but you can't remove it
app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!')
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})