"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    var puzzleString = req.body.puzzle;
    var value = req.body.value;
    var coordinate = req.body.coordinate;
    if (puzzleString == "" || puzzleString == null || value == "" || value == null || coordinate == ""|| coordinate == null) {
      res.json({
        error: "Required field(s) missing",
      });
    }else if (!coordinate.match(/[a-z]+/i) || !coordinate.match(/[0-9]+/)){
      res.json({
        error: "Invalid coordinate",
      });
    } else {
      const puzzleArray = solver.grid(puzzleString);
      var row = (coordinate.match(/[a-z]+/i)[0]).toUpperCase();
      var column = coordinate.match(/[0-9]+/)[0];
      const lookup = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9 };
      //validate input
      if (!/[A-I]{1}/.test(row) || !/^[1-9]{1}$/.test(column) || row == '' || column == '') {
        res.json({
          error: "Invalid coordinate",
        });
      } else if (!/^[1-9]{1}$/.test(value)) {
        res.json({
          error: "Invalid value",
        });
      } else if (solver.validate(puzzleString) != true) {
        res.json(solver.validate(puzzleString));
      } else if (puzzleArray[lookup[row] - 1][column - 1] == value) {
        res.json({
          valid: true,
        });
      } else {
        const conflicts = [];
        var valid = true;
        if (!solver.checkRowPlacement(puzzleArray, row, column, value)) {
          conflicts.push("row");
          valid = false;
        }
        if (!solver.checkColPlacement(puzzleArray, lookup[row], column, value)) {
          conflicts.push("column");
          valid = false;
        }
        if (!solver.checkRegionPlacement(puzzleArray, row, column, value)) {
          conflicts.push("region");
          valid = false;
        }
        if (valid) {
          res.json({
            valid: true,
          });
        } else {
          res.json({
            valid: false,
            conflict: conflicts,
          });
        }
      }
    }
  });

  app.route("/api/solve").post((req, res) => {
    var puzzleString = req.body.puzzle;
    if (puzzleString == "" || puzzleString == null) {
      res.json({
        error: "Required field missing",
      });
    } else {
      const valid = solver.validate(puzzleString);
      if (valid != true) {
        res.json(valid);
      } else {
        let solved = solver.solve(puzzleString);
        res.json(solved);
      }
    }
  });
};
