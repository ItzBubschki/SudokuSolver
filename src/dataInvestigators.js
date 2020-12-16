const fieldConstantsHandler = require("./fieldConstantsHandler");
const sudokuSolver = require('./sudokuSolver');

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
        sudokuSolver.updateMissingData(field);
    } catch {
        return false;
    }
    return true;
}

function getSquareContent(number, currentField) {
    const rowIndex = fieldConstantsHandler.getRowIndexForSquare(number);
    const columnIndex = fieldConstantsHandler.getColumnIndexForSquare(number);
    const content = [];
    for (let i = rowIndex; i < rowIndex + 3; i++) {
        const row = [];
        for (let j = columnIndex; j < columnIndex + 3; j++) {
            row.push(currentField[i][j]);
        }
        content.push(row);
    }
    return content;
}

function columnContainsNumber(number, column, currentField) {
    let count = 0;
    for (let i = 0; i < currentField.length; i++) {
        if (currentField[i][column] === number) {
            count++;
        }
    }
    return count;
}

function rowContainsNumber(number, row, currentField) {
    let count = 0;
    for (let i = 0; i < currentField.length; i++) {
        if (currentField[row][i] === number) {
            count++;
        }
    }
    return count;
}

function squareContainsNumber(number, square, currentField) {
    const beginIndexColumn = fieldConstantsHandler.getColumnIndexForSquare(square);
    const beginIndexRow = fieldConstantsHandler.getRowIndexForSquare(square);
    for (let i = beginIndexRow; i < beginIndexRow + 3; i++) {
        for (let j = beginIndexColumn; j < beginIndexColumn + 3; j++) {
            if (currentField[i][j] === number) {
                return true;
            }
        }
    }
    return false;
}

function checkIfGameFinished(currentField) {
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

exports.getSquareContent = getSquareContent;
exports.columnContainsNumber = columnContainsNumber;
exports.rowContainsNumber = rowContainsNumber;
exports.squareContainsNumber = squareContainsNumber;
exports.checkIfGameFinished = checkIfGameFinished;
exports.validateGameField = validateGameField;