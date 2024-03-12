/*!
 * Copyright 2024 Hitachi Vantara. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "pentaho/module!_",
  "../../../ccc/visual/Abstract"
], function (module, BaseView) {
  
  "use strict";
  
  return BaseView.extend(module.id, {
    
    /** @override */
    _buildData: function () {
      var model = this.model;
      var dataTable = model.data;
      
      if (dataTable.originalCrossTable) {
        dataTable = dataTable.originalCrossTable.toPlainTable({ skipRowsWithAllNullMeasures: true });
      }
      
      var rowCount = dataTable.getNumberOfRows();
      var ColCount = dataTable.getNumberOfColumns();
      var measureColIndices = model.measures.fieldIndexes;
      var seriesColIndexes = model.rows.fieldIndexes;
      var categoriesColIndexes = model.category.fieldIndexes;
      
      var radarData = {
        records: [],
        indicator: []
      };
      
      radarData.records = this._seriesData(rowCount, measureColIndices, seriesColIndexes, dataTable);
      radarData.indicator = this._indicatorData(rowCount, measureColIndices, seriesColIndexes, dataTable);
      return radarData;
    },
    
    _seriesData: function (rowCount, measureIndices, categoriesColIndexes, dataTable) {
      var seriesData = [];
      // measureIndices.forEach(function (colIdx) {
      //   var measuresName = dataTable.getColumnLabel(colIdx);
      //   var measuresValue = [];
      
      //   for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      //     measuresValue.push(dataTable.getValue(rowIdx, colIdx));
      //   }
      
      //   seriesData.push({
      //     name: measuresName,
      //     value: measuresValue,
      //   });
      // });
      
      var me = this;
      for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
        var measuresValue = [];
        var measureName = null;
        
        measureIndices.forEach(function (colIdx) {
          measuresValue.push(dataTable.getValue(rowIdx, colIdx));
          measureName = me._getTableFormattedValue(dataTable, rowIdx, categoriesColIndexes);
          
          seriesData.push({
            name: measureName,
            value: measuresValue,
          });
        });
      };
      
      return seriesData;
    },
    
    _indicatorData: function (rowCount, measureColIndices, categoryIndices, dataTable) {
      var indicatorArray = [];
      // for (var rowInd = 0; rowInd < rowCount; rowInd++) {
      //   indicatorArray.push({
      //     name: this._getTableFormattedValue(dataTable, rowInd, categoryIndices),
      //     // max: dataTable.getColumnRange(measureColIndices[0]).max
      //   });
      // }
      
      measureColIndices.forEach(function (colIdx) {
        indicatorArray.push({
          name: dataTable.getColumnLabel(colIdx),
          max: dataTable.getColumnRange(colIdx).max
        });
      });
      
      return indicatorArray;
    },
    
    _configureData: function (options, data) {
      options.series.forEach(function (row) {
        row.data = data.records;
      });
    },
    
    _configureOptions: function () {
      this.base();
      var options = this._echartOptions;
      var model = this.model;
      var dataRecords = this._echartData;
      var fontWeight = model.labelStyle;
      fontWeight = fontWeight === "plain" ? "normal" : fontWeight;
      
      options.radar = {
        indicator: dataRecords.indicator,
        
        shape: model.radarShape,
        axisName: {
          color: model.labelColor,
          fontWeight: fontWeight,
          formatter: function (value) {
            var maxAxisNameLength = 14;
            return value.length > maxAxisNameLength ? value.substring(0, maxAxisNameLength) + '...' : value;
          }
        },
        axisLabel: {
          show: model.showAxisTickLabel,
          color: model.labelColor,
          fontWeight: fontWeight,
          showMinLabel: false,
          formatter: function (value) {
            return Intl.NumberFormat('en-US', {
              notation: "compact",
              maximumFractionDigits: 2,
              compactDisplay: "short"
            }).format(value);
          }
        }
      }
      
      this._configureLabel(options, this._getEChartsLabel(model.labelsOption), '{c}');
      this._configureLegend(options, dataRecords.records);
    },
    
    /** @override */
    _buildSeries: function () {
      var model = this.model;
      return [
        {
          type: "radar",
          labelLayout: {
            hideOverlap: 'true'
          },
          emphasis: {
            focus: 'self'
          },
          symbol: model.Shape,
          areaStyle: { opacity: model.showArea ? 0.7 : 0 },
          lineStyle: { width: model.lineWidth }
        }
      ];
    }
  })
  .implement(module.config);
});
