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
  "./Abstract"
], function (module, BaseView) {

  "use strict";

  return BaseView.extend(module.id, {
    _cccClass: "TreemapChart",

    _roleToCccRole: {
      "rows": "category",
      "multi": "multiChart",
      "size": "size"
    },

    _genericMeasureCccVisualRole: "size",
    _genericMeasureDiscrimCccVisualRole: "multiChart",

    _multiRole: "multi",

    _discreteColorRole: "rows",

    _configureOptions: function () {
      this.base();

      this.options.layoutMode = this.model.layoutMode;

      if (this.model.viewSize){
        this.options.valuesMask = this._configureValuesMask();
      }
    },

    _configureValuesMask: function () {
      return "{category} ({size})";
    }

  }).implement(module.config);
});
