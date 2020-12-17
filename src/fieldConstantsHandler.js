function getRowIndexForSquare(squareNumber) {
    let beginIndexRow = 0;
    if (squareNumber > 2 && squareNumber < 6) {
        beginIndexRow = 3;
    } else if (squareNumber > 5) {
        beginIndexRow = 6;
    }
    return beginIndexRow;
}

function getColumnIndexForSquare(squareNumber) {
    return (squareNumber % 3) * 3;
}

function getCurrentSquareNumber(row, column) {
    let square = 0;
    if (row > 2 && row < 6) {
        square = 3;
    } else if (row > 5) {
        square = 6;
    }

    if (column > 2 && column < 6) {
        square++;
    } else if (column > 5) {
        square += 2;
    }
    return square;
}

exports.getRowIndexForSquare = getRowIndexForSquare;
exports.getColumnIndexForSquare = getColumnIndexForSquare;
exports.getCurrentSquareNumber = getCurrentSquareNumber;
