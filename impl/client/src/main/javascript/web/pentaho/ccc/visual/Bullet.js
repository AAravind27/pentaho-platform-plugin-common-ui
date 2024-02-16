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
  "./Abstract"
], function (module, BaseView) {

  return BaseView.extend(module.id, {
    _cccClass: "BulletChart",

      _options: {
        tooltipEnabled: false,
        selectable: true,
        dataTypeCheckingMode: "extended"
      },

    _roleToCccRole: {
      "rows": "title",
      "columns": "subTitle",
      "measures": "value",
      "ranges": "range",
      "markers": "marker"
    },

    _multiRole: null,

      _prepareLayout: function() {
        this.base();
        var options = this.options;
        var isVertical = options.orientation === "vertical";
        var resultSetLength = this.model.data.getNumberOfRows();

        if (resultSetLength > 20) {
            options.bulletSize = 10;
            options.bulletSpacing = isVertical ? 60 : 20;
        } else if (resultSetLength > 10) {
            options.bulletSize = 15;
            options.bulletSpacing = isVertical ? 80 : 30;
        } else {
            options.bulletSize = 20;
            options.bulletSpacing = isVertical ? 120 : 50;
        }
      }
    }).implement(module.config);
});
