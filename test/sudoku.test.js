const sudokuSolver = require('../src/sudokuSolver');
const fs = require('fs');

const testDataEmptyPath = './test-data/empty-fields';
const testDataFilledPath = './test-data/filled-fields';

test('validate sudoku game 0', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/empty-field0.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());

    const validated = sudokuSolver.validateGameField(emptyField);

    expect(validated).toBeTruthy();
})

test('invalidate sudoku game 0', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/invalid-field0.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());

    const validated = sudokuSolver.validateGameField(emptyField);

    expect(validated).toBeFalsy();
})

test('invalidate sudoku game 1', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/invalid-field1.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());

    const validated = sudokuSolver.validateGameField(emptyField);

    expect(validated).toBeFalsy();
})

test('invalidate sudoku game 2', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/invalid-field2.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());

    const validated = sudokuSolver.validateGameField(emptyField);

    expect(validated).toBeFalsy();
})

test('invalidate sudoku game 3', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/invalid-field3.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());

    const validated = sudokuSolver.validateGameField(emptyField);

    expect(validated).toBeFalsy();
})

test('solve sudoku game 0', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/empty-field0.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());
    const rawDataFilled = fs.readFileSync(`${testDataFilledPath}/filled-field0.json`)
    const filledFieldData = JSON.parse(rawDataFilled.toString());

    const filledFieldResponse = sudokuSolver.solveGame(emptyField);
    expect(filledFieldResponse).toEqual(filledFieldData);
})

test('solve sudoku game 1', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/empty-field1.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());
    const rawDataFilled = fs.readFileSync(`${testDataFilledPath}/filled-field1.json`)
    const filledFieldData = JSON.parse(rawDataFilled.toString());

    const filledFieldResponse = sudokuSolver.solveGame(emptyField);

    expect(filledFieldResponse).toEqual(filledFieldData);
})

test('solve sudoku game 2 (expert)', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/empty-field2.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());
    const rawDataFilled = fs.readFileSync(`${testDataFilledPath}/filled-field2.json`)
    const filledFieldData = JSON.parse(rawDataFilled.toString());

    const filledFieldResponse = sudokuSolver.solveGame(emptyField);
    expect(filledFieldResponse).toEqual(filledFieldData);
})

test('solve sudoku game 3 (expert)', () => {
    const rawDataEmpty = fs.readFileSync(`${testDataEmptyPath}/empty-field3.json`);
    const emptyField = JSON.parse(rawDataEmpty.toString());
    const rawDataFilled = fs.readFileSync(`${testDataFilledPath}/filled-field3.json`)
    const filledFieldData = JSON.parse(rawDataFilled.toString());

    const filledFieldResponse = sudokuSolver.solveGame(emptyField);
    expect(filledFieldResponse).toEqual(filledFieldData);
})