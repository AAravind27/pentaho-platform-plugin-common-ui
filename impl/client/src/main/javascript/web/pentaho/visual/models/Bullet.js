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
  "./Abstract",
  "./mixins/ScaleColorDiscrete",
  "./types/LabelsOption",
  "pentaho/i18n!./i18n/model"
], function (module, BaseModel, ScaleColorDiscreteModel, LabelsOption, bundle) {

  "use strict";

  return BaseModel.extend({
    $type: {
      id: module.id,
      mixins: [ScaleColorDiscreteModel],

        category: "misc2",

        label: "Bullet",

      props: [
        {
          name: "rows", // VISUAL_ROLE
          base: "pentaho/visual/role/Property",
            fields: {isRequired: true}
          // modes: [
          //   {dataType: "string"}
          // ]
        },
        {
          name: "columns", // VISUAL_ROLE
          base: "pentaho/visual/role/Property",
            fields: {isRequired: true}
          // modes: [
          //   {dataType: "string"}
            // ]
        },
        {
          name: "measures", // VISUAL_ROLE
          base: "pentaho/visual/role/Property",
            // ordinal: 7,
            fields: {isRequired: true},
          modes: [
            {dataType: "number"}
          ],
        },
        {
          name: "labelsOption",
          valueType: LabelsOption,
            domain: ["none", "left", "right", "top", "bottom"],
          isRequired: true,
          defaultValue: "none"
        },
        {
          name: "ranges", // VISUAL_ROLE
          base: "pentaho/visual/role/Property",
          modes: [
            {dataType: ["number"]}
          ],
          // fields: {isRequired: __isRequiredOneMeasure},
          // ordinal: 7
        },
        {
          name: "markers", // VISUAL_ROLE
          base: "pentaho/visual/role/Property",
          modes: [
            {dataType: ["number"]}
          ]
          // fields: {isRequired: __isRequiredOneMeasure},
          // ordinal: 8
        }
      ]
    }
  })
      .localize({$type: bundle.structured.Bullet})
      .configure();
});
