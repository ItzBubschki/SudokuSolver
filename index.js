const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sudokuSolver = require('./src/sudokuSolver');

const app = express();
const port = 6969;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/solve', (req, res) => {
    const bodyData = req.body;
    let fieldData = bodyData;
    if (bodyData.data) {
        fieldData = bodyData.data;
    }
    if (sudokuSolver.validateGameField(fieldData)) {
        const filledGame = sudokuSolver.solveGame(fieldData);
        res.send(filledGame);
    } else {
        console.log("fail");
        res.status(400).send("Invalid input");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});