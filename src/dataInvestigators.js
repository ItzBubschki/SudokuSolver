const fieldConstantsHandler = require("./fieldConstantsHandler");

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

exports.getSquareContent = getSquareContent;
exports.columnContainsNumber = columnContainsNumber;
exports.rowContainsNumber = rowContainsNumber;
exports.squareContainsNumber = squareContainsNumber;