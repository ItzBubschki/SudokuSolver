const {states, phases, availableNums} = require('./constants');
const helpers = require('./helpers');
const fieldConstantsHandler = require("./fieldConstantsHandler");
const dataInvestigators = require('./dataInvestigators');

let filledField, currentField, checkPoint;
let jsonData;

function validateGameField(field) {
    if (field.length === 9) {
        for (let i = 0; i < field.length; i++) {
            if (field[i].length === 9) {
                for (let j = 0; j < field[i].length; j++) {
                    const fieldValue = Number.parseInt(field[i][j]);
                    if (fieldValue <= 0 || fieldValue > 9) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
    try {
        currentField = field;
        updateMissingData();
    } catch {
        return false;
    }
    return true;
}

function solveGame(field) {
    filledField = helpers.createDeepArrayCopy(field);
    currentField = helpers.createDeepArrayCopy(field);
    updateMissingData();
    handleMissingFields();
    return filledField;
}

function updateMissingData() {
    jsonData = {rows: [], squares: []};
    for (let i = 0; i < currentField.length; i++) {
        const availableRow = {...availableNums};
        const emptyCellsRow = [];
        for (let j = 0; j < currentField[i].length; j++) {
            const num = currentField[i][j];
            if (num !== "") {
                delete availableRow[num];
            } else {
                emptyCellsRow.push(j);
            }
        }
        const empty = Object.values(emptyCellsRow);
        const missing = Object.keys(availableRow);
        if (empty.length !== missing.length) {
            throw "Added a number into a wrong field";
        }
        const rowData = {
            empty: empty,
            missing: missing,
        };
        jsonData["rows"].push(rowData);
    }

    for (let i = 0; i < currentField.length; i++) {
        const availableSquare = {...availableNums};
        const emptyCellsSquare = [];
        const squareContent = dataInvestigators.getSquareContent(i, currentField);

        for (let j = 0; j < squareContent.length; j++) {
            const sRow = squareContent[j];
            for (let k = 0; k < sRow.length; k++) {
                const field = sRow[k];
                if (field !== "") {
                    delete availableSquare[field];
                } else {
                    const rowIndex = fieldConstantsHandler.getRowIndexForSquare(i);
                    const columnIndex = fieldConstantsHandler.getColumnIndexForSquare(i);
                    const cord = {
                        x: rowIndex + j,
                        y: columnIndex + k,
                    };
                    emptyCellsSquare.push(cord);
                }
            }
        }
        const empty = Object.values(emptyCellsSquare);
        const missing = Object.keys(availableSquare);
        if (empty.length !== missing.length) {
            throw "Added a number into a wrong field";
        }
        const squareData = {
            empty: empty,
            missing: missing,
        };
        jsonData["squares"].push(squareData);
    }
}

function handleMissingFields() {
    let currentState = states.FILLED;
    let currentPhase = phases.NORMAL;
    while (currentState !== states.FINISHED && currentState !== states.FAILED) {
        let newState;
        let filledSomething = iterateThroughRows();
        switch (currentState) {
            case states.FILLED:
                if (filledSomething) {
                    newState = states.FILLED;
                } else {
                    invertTable();
                    newState = states.INVERTED;
                }
                break;
            case states.INVERTED:
                invertTable();
                if (filledSomething) {
                    newState = states.FILLED;
                } else {
                    newState = states.SQUARES;
                }
                break;
            case states.SQUARES:
                filledSomething = iterateThroughSquares();
                if (filledSomething) {
                    newState = states.FILLED;
                } else {
                    const finishedGame = checkIfGameFinished();
                    if (finishedGame) {
                        newState = states.FINISHED;
                    } else {
                        newState = states.STUCK;
                        if (currentPhase === phases.NORMAL) {
                            checkPoint = helpers.createDeepArrayCopy(currentField);
                            currentPhase = phases.GUESSING;
                        }
                    }
                }
                break;
            case states.STUCK:
                const guessedSomething = guessEmptyField();
                if (guessedSomething) {
                    newState = states.FILLED;
                }
                break;
            case states.FAILED_GUESS:
                currentField = helpers.createDeepArrayCopy(checkPoint);
                newState = states.STUCK;
                break;
        }
        try {
            updateMissingData();
        } catch {
            newState = states.FAILED_GUESS;
        }
        currentState = newState;
    }

    filledField = currentField;
}

function invertTable() {
    currentField = currentField[0].map((x, i) => currentField.map((x) => x[i]));
}

function iterateThroughRows() {
    for (let i = 0; i < jsonData["rows"].length; i++) {
        const row = jsonData["rows"][i];
        if (row["missing"].length === 1) {
            fillEmptyField(row["missing"][0], i, row["empty"][0]);
            return true;
        } else {
            const restrictedFields = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
            };
            for (let j = 0; j < row["empty"].length; j++) {
                const currentFieldValue = row["empty"][j];
                const excludedNums = [];
                for (let k = 0; k < row["missing"].length; k++) {
                    const currentNumber = row["missing"][k];
                    if (dataInvestigators.columnContainsNumber(currentNumber, currentFieldValue, currentField) > 0) {
                        restrictedFields[currentNumber].push(currentFieldValue);
                        if (row["missing"].length === 2) {
                            if (k === 1) {
                                fillEmptyField(row["missing"][j], i, row["empty"][0]);
                            } else {
                                fillEmptyField(row["missing"][j], i, row["empty"][1]);
                            }
                            return true;
                        } else {
                            excludedNums.push(currentNumber);
                        }
                    } else if (
                        dataInvestigators.squareContainsNumber(
                            currentNumber,
                            fieldConstantsHandler.getCurrentSquareNumber(i, currentFieldValue), currentField)
                    ) {
                        excludedNums.push(currentNumber);
                        restrictedFields[currentNumber].push(currentFieldValue);
                    }
                }
                if (excludedNums.length + 1 === row["missing"].length) {
                    for (let k = 0; k < row["missing"].length; k++) {
                        if (!excludedNums.includes(row["missing"][k])) {
                            fillEmptyField(row["missing"][k], i, row["empty"][j]);
                            return true;
                        }
                    }
                }
            }
            const keys = Object.keys(restrictedFields);
            for (let k = 0; k < keys.length; k++) {
                const value = restrictedFields[keys[k]];
                const emptyFields = row["empty"];
                if (value.length + 1 === emptyFields.length) {
                    for (let l = 0; l < emptyFields.length; l++) {
                        if (!value.includes(emptyFields[l])) {
                            fillEmptyField(keys[k], i, emptyFields[l]);
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function iterateThroughSquares() {
    for (let i = 0; i < jsonData["squares"].length; i++) {
        const square = jsonData["squares"][i];
        if (square.missing.length === 1) {
            fillEmptyField(square.missing[0], square.empty["0"].x, square.empty["0"].y);
            return true;
        } else {
            const restrictedFields = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
            };
            for (let j = 0; j < square.empty.length; j++) {
                for (let k = 0; k < square.missing.length; k++) {
                    const num = square.missing[k];
                    if (
                        dataInvestigators.rowContainsNumber(num, square.empty[j].x, currentField) > 0 ||
                        dataInvestigators.columnContainsNumber(num, square.empty[j].y, currentField) > 0
                    ) {
                        restrictedFields[num].push(square.empty[j]);
                    }
                }
            }
            for (let j = 0; j < square.missing.length; j++) {
                const num = square.missing[j];
                if (restrictedFields[num].length === square.empty.length - 1) {
                    for (let k = 0; k < square.empty.length; k++) {
                        if (!restrictedFields[num].includes(square.empty[k])) {
                            fillEmptyField(num, square.empty[k].x, square.empty[k].y);
                            return true;
                        }
                    }
                }
            }
        }
    }
}

function fillEmptyField(number, row, column) {
    if (currentField[row][column] === "") {
        currentField[row][column] = number;
    } else {
        throw "Field not empty";
    }
}

function checkIfGameFinished() {
    for (let i = 0; i < currentField.length; i++) {
        const row = currentField[i];
        for (let j = 0; j < row.length; j++) {
            if (currentField[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

function guessEmptyField() {
    let iterations = 0;
    while (iterations < 20) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomColumnNum = Math.floor(Math.random() * jsonData.rows[randomRow].empty.length);
        const randomColumn = jsonData.rows[randomRow].empty[randomColumnNum];
        const randomNumberIndex = Math.floor(Math.random() * jsonData.rows[randomRow].missing.length);
        const randomNumber = jsonData.rows[randomRow].missing[randomNumberIndex];
        if (currentField[randomRow][randomColumn] === "") {
            currentField[randomRow][randomColumn] = randomNumber;
            return true;
        } else {
            iterations++;
        }
    }
    return false;
}

exports.solveGame = solveGame;
exports.validateGameField = validateGameField;
