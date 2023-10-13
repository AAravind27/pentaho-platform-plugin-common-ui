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
    "./BarAbstract",
    "./types/LabelsOption",
    "./types/Orientation",
    "./types/Direction",
    "pentaho/i18n!./i18n/model"
], function (module, BaseModel, LabelsOption, Orientation, Direction, bundle) {

    "use strict";

    return BaseModel.extend({
        $type: {
            id: module.id,

            v2Id: "ccc_waterfall",
            category: "waterfallchart",

            label: "Waterfall Chart",

            props: [
                {
                    name: "measures", // VISUAL_ROLE
                    fields: { isRequired: true },
                    ordinal: 7
                },
                {
                    name: "direction",
                    valueType: Direction,
                    domain: ["up", "down"],
                    isRequired: false,
                    defaultValue: "up"
                },
                {
                    name: "orientation",
                    valueType: Orientation,
                    domain: ["horizontal", "vertical"],
                    isRequired: false,
                    defaultValue: "vertical"
                },
                {
                    name: "labelsOption",
                    valueType: LabelsOption,
                    domain: ["none", "center", "insideEnd", "insideBase", "outsideEnd"],
                    isRequired: true,
                    defaultValue: "none"
                }
            ]
        }
    })
        .localize({ $type: bundle.structured.Waterfall })
        .configure();
});
