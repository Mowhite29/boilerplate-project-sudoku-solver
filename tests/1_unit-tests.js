const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
    test('1. Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), true);
    });
    test('2. Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.notEqual(solver.validate('..9..5.1.85.4..m.2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), true);
    });
    test('3. Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.notEqual(solver.validate('..9..5.1.85.4..m.2432......'), true);
    });
    test('4. Logic handles a valid row placement', () => {
        assert.isTrue(solver.checkRowPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 7));
    });
    test('5. Logic handles an invalid row placement', () => {
        assert.isNotTrue(solver.checkRowPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 1));
    });
    test('6. Logic handles a valid column placement', () => {
        assert.isTrue(solver.checkColPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 7));
    });
    test('7. Logic handles an invalid column placement', () => {
        assert.isNotTrue(solver.checkColPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 1));
    });
    test('8. Logic handles a valid region (3x3 grid) placement', () => {
        assert.isTrue(solver.checkRegionPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 7));
    });
    test('9. Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isNotTrue(solver.checkRegionPlacement(solver.grid('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A', 1, 9));
    });
    test('10. Valid puzzle strings pass the solver', () => {
        assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..').solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
    });
    test('11. Invalid puzzle strings fail the solver', () => {
        assert.equal(solver.solve('999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..').error, 'Puzzle cannot be solved')
    });
    test('12. Solver returns the expected solution for an incomplete puzzle', () => {
        assert.equal(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..').solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625')
    });
});
