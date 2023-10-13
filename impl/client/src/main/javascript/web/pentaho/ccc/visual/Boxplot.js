/*!
 * Copyright 2010 - 2019 Hitachi Vantara. All rights reserved.
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
  "./CategoricalContinuousAbstract",
  "pentaho/data/TableView",
  "cdf/lib/CCC/pvc",
  "cdf/lib/CCC/def",
], function (module, BaseView, DataView, pvc, def) {

  "use strict";

  return BaseView.extend(module.id, {
    _cccClass: "BoxplotChart",

    _roleToCccRole: {
      "rows": "category",
      "columns": "series",
      "multi": "multiChart",
      "minimum": "minimum",
      "lowerQuartile": "lowerQuartil",
      "median": "median",
      "measures": "measures",
      "upperQuartile": "upperQuartil",
      "maximum": "maximum"
    },

    _update : function(event, action) {
      this.base(event, action);
      console.log("update function");
    }

    // _initData: function () {

    //   var model = this.model;

    //   var dataTable = model.data;
    //   this._dataView = new DataView(dataTable);

    //   this._dataView.getColumnRange(1);
    //   var range = this._dataView.getColumnRange(1);
    //   var min = range.min;
    //   var max = range.max;

    //   // dataTable.addColumn(min);

    //   this.options.visualRoles = {
    //     // median:       'value',
    //     // lowerQuartil: 'value2',
    //     // upperQuartil: 'value3',
    //     minimum: min,
    //     maximum: max
    //   }
    // },

    // _configureOptions: function () {
    //   //NOOP
    // },

    // _renderCore: function () {
    //   this.__disposeChart();

    //   this._chart = this._createChart(pvc[this._cccClass]);
    //   this._chart.setData(this._dataView.toJsonCda(), { crosstabMode: false });

    //   var isPaginated = this.options.multiChartOverflow === "page";
    //   if (isPaginated) {
    //     this._chart.renderPages();
    //   } else {
    //     this._chart.render();
    //   }

    //   return null;
    // },


  })
    .implement(module.config);
});
