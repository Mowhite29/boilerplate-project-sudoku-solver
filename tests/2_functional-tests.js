const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('1. Solve a puzzle with valid puzzle string: POST request to /api/solve', done => {
        chai.request(server)
            .post('/api/solve/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.solution, '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
                done();
            })
    });
    test('2. Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
        chai.request(server)
            .post('/api/solve/')
            .send({
                puzzle: ''
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Required field missing');
                done();
            })
    });
    test('3. Solve a puzzle with invalid characters: POST request to /api/solve', done => {
        chai.request(server)
            .post('/api/solve/')
            .send({
                puzzle: '..9a.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
    });
    test('4. Solve a puzzle with incorrect length: POST request to /api/solve', done => {
        chai.request(server)
            .post('/api/solve/')
            .send({
                puzzle: '..9..5.1.85.4....243'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
    });
    test('5. Solve a puzzle that cannot be solved: POST request to /api/solve', done => {
        chai.request(server)
            .post('/api/solve/')
            .send({
                puzzle: '9999.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Puzzle cannot be solved');
                done();
            })
    });
    test('6. Check a puzzle placement with all fields: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '7',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, true);
                done();
            })
    });
    test('7. Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '2',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 1);
                assert.equal(res.body.conflict[0], "region");
                done();
            })
    });
    test('8. Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '1',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 2);
                assert.equal(res.body.conflict[0], "row");
                assert.equal(res.body.conflict[1], "column");
                done();
            })
    });
    test('9. Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '5',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 3);
                assert.equal(res.body.conflict[0], "row");
                assert.equal(res.body.conflict[1], "column");
                assert.equal(res.body.conflict[2], "region");
                done();
            })
    });
    test('10. Check a puzzle placement with missing required fields: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            })
    });
    test('11. Check a puzzle placement with invalid characters: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: '1',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
            })
    });
    test('12. Check a puzzle placement with incorrect length: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1',
                coordinate: 'a1',
                value: '1',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
            })
    });
    test('13. Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: '11',
                value: '1',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            })
    });
    test('14. Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
        chai.request(server)
            .post('/api/check/')
            .send({
                puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
                coordinate: 'a1',
                value: 'a',
            })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
                done();
            })
    });
});
