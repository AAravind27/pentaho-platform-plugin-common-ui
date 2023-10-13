/*!
 * Copyright 2023 Hitachi Vantara. All rights reserved.
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
  "./PointAbstract",
  "./types/Orientation",
  "pentaho/i18n!./i18n/model"
], function (module, BaseModel, Orientation, bundle) {

  "use strict";

  return BaseModel.extend({
    $type: {
      id: module.id,

      v2Id: "ccc_Dot",
      category: "dotchart",

      label: "Dot Chart",

      props: [
        {
          name: "orientation",
          valueType: Orientation,
          domain: ["horizontal", "vertical"],
          isRequired: false,
          defaultValue: "vertical"
        },
      ]
    }
  })
      .localize({$type: bundle.structured.Dot})
      .configure();
});
