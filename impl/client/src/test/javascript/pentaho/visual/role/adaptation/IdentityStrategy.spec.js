/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2029-07-20
 ******************************************************************************/

define([
  "pentaho/visual/role/adaptation/IdentityStrategy",
  "pentaho/type/List",
  "pentaho/type/Complex",
  "pentaho/data/Table"
], function(Strategy, List, Complex, DataTable) {

  "use strict";

  describe("pentaho.visual.role.adaptation.IdentityStrategy", function() {

    var dataTable;

    var datasetFieldIndexes = {
      country: 0,
      sales: 1,
      category: 2
    };

    function getDataSpec1() {
      return {
        model: [
          {name: "country", type: "string", label: "Country"},
          {name: "sales", type: "number", label: "Sales"},
          {name: "category", type: "string", label: "Code"}
        ],
        rows: [
          {c: [{v: "PT", f: "Portugal"}, {v: 12000}, {v: "A", f: "AA1"}]},
          {c: [{v: "UK", f: "United Kingdom"}, {v: 6000}, {v: "B", f: "BB1"}]},
          {c: [{v: "ES", f: "Spain"}, {v: 60000}, {v: "A", f: "AA2"}]},
          {c: [{v: "FR", f: "France"}, {v: 20000}, null]},
          {c: [{v: "IT", f: "Italy"}, {v: 30000}, {v: null}]}
        ]
      };
    }

    // ---

    function Cell(value, formatted) {
      this.value = value;
      this.formatted = formatted;
    }

    Cell.prototype.valueOf = function() {
      return this.value;
    };

    Cell.prototype.toString = function() {
      return this.formatted;
    };

    // ---

    beforeAll(function() {
      dataTable = new DataTable(getDataSpec1());
    });

    describe(".Type", function() {

      describe("#getInputTypeFor(outputDataType, isVisualKeyEf)", function() {

        it("should return null if given a list type", function() {

          var inputType = Strategy.type.getInputTypeFor(List.type, true);
          expect(inputType).toBe(null);

          inputType = Strategy.type.getInputTypeFor(List.type, false);
          expect(inputType).toBe(null);
        });

        it("should return the same, given type, if it is not a list type", function() {

          var Foo = Complex.extend();

          var inputType = Strategy.type.getInputTypeFor(Foo.type, true);
          expect(inputType).toBe(Foo.type);

          inputType = Strategy.type.getInputTypeFor(Foo.type, false);
          expect(inputType).toBe(Foo.type);
        });
      });

      describe("#validateApplication(schemaData, inputFieldIndexes)", function() {

        it("should return an object with isValid: true", function() {
          var result = Strategy.type.validateApplication(dataTable, [0]);
          expect(result).toEqual(jasmine.objectContaining({isValid: true}));
        });

        it("should return an object with addsFields: false", function() {
          var result = Strategy.type.validateApplication(dataTable, [0]);
          expect(result).toEqual(jasmine.objectContaining({addsFields: false}));
        });
      });

      describe("#apply(data, inputFieldIndexes)", function() {

        it("should return a strategy instance", function() {

          var strategy = Strategy.type.apply(dataTable, [0]);
          expect(strategy instanceof Strategy).toBe(true);
        });

        it("should return a strategy having the given data", function() {

          var strategy = Strategy.type.apply(dataTable, [0]);
          expect(strategy.data).toBe(dataTable);
        });

        it("should return a strategy having the given inputFieldIndexes", function() {
          var inputFieldIndexes = [0];
          var strategy = Strategy.type.apply(dataTable, inputFieldIndexes);
          expect(strategy.inputFieldIndexes).toEqual(inputFieldIndexes);
        });

        it("should return a strategy with the given inputFieldIndexes as outputFieldIndexes", function() {
          var inputFieldIndexes = [0];
          var strategy = Strategy.type.apply(dataTable, inputFieldIndexes);
          expect(strategy.outputFieldIndexes).toEqual(inputFieldIndexes);
        });
      });
    });

    describe("#isInvertible", function() {

      it("should return true", function() {

        var strategy = Strategy.type.apply(dataTable, [0]);

        expect(strategy.isInvertible).toBe(true);
      });
    });

    describe("#map(inputValues)", function() {

      var strategy;

      beforeEach(function() {
        strategy = Strategy.type.apply(dataTable, [datasetFieldIndexes.category]);
      });

      it("should return a cell corresponding to a given existing value", function() {

        var outputCells = strategy.map(["A"]);

        expect(outputCells).toEqual([
          jasmine.objectContaining({value: "A", formatted: "AA1"})
        ]);
      });

      it("should return a cell corresponding to a given (equal) existing cell", function() {

        var outputCells = strategy.map([new Cell("A", "Dummy")]);

        expect(outputCells).toEqual([
          jasmine.objectContaining({value: "A", formatted: "AA1"})
        ]);
      });

      it("should return null if given a non-existing value", function() {

        var outputCells = strategy.map(["C"]);

        expect(outputCells).toBe(null);
      });

      it("should return [{value: null}] if given an existing null", function() {

        var outputCells = strategy.map([null]);

        expect(outputCells).toEqual([jasmine.objectContaining({value: null})]);
      });

      it("should create the index only once", function() {

        spyOn(strategy, "__installIndex").and.callThrough();

        strategy.map(["A"]);

        expect(strategy.__installIndex).toHaveBeenCalledTimes(1);

        strategy.map(["A"]);

        expect(strategy.__installIndex).toHaveBeenCalledTimes(1);

        strategy.invert(["A"]);

        expect(strategy.__installIndex).toHaveBeenCalledTimes(1);
      });
    });

    describe("#invert(outputValues)", function() {

      var strategy;

      beforeEach(function() {
        strategy = Strategy.type.apply(dataTable, [datasetFieldIndexes.category]);
      });

      it("should return a cell corresponding to a given existing value", function() {

        var inputCells = strategy.invert(["A"]);

        expect(inputCells).toEqual([
          jasmine.objectContaining({value: "A", formatted: "AA1"})
        ]);
      });

      it("should return a cell corresponding to a given (equal) existing cell", function() {

        var inputCells = strategy.invert([new Cell("A", "Dummy")]);

        expect(inputCells).toEqual([
          jasmine.objectContaining({value: "A", formatted: "AA1"})
        ]);
      });

      it("should return null if given a non-existing value", function() {

        var inputCells = strategy.invert(["C"]);

        expect(inputCells).toBe(null);
      });

      it("should return [{value: null}] if given an existing null", function() {

        var inputCells = strategy.invert([null]);

        expect(inputCells).toEqual([jasmine.objectContaining({value: null})]);
      });
    });
  });
});
