/*
 * Copyright 2023 Hitachi Vantara. All rights reserved.
 * This program is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License, version 2.1 as published by the Free Software
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
 * or from the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 */
define([
  "pentaho/module!_",
  "pentaho/i18n!./i18n/model",
  "./Abstract",
  "./mixins/MultiCharted",
  "./mixins/ScaleColorDiscrete",
  "./types/LayoutMode"
], function (module, bundle, BaseModel, MultiChartedModel, ScaleColorDiscreteModel, LayoutMode) {
  "use strict";

  return BaseModel.extend({
    $type: {
      id: module.id,
      mixins: [MultiChartedModel, ScaleColorDiscreteModel],

      v2Id: "ccc_treemap",
      category: "treemapchart",

      // The label may show up in menus
      label: "Tree Map",

      // Properties
      props: [
        // Visual role properties
        {
          name: "rows",
          modes: [{dataType: "list"}],
          isRequired: true
        },
        {
          name: "size",
          base: "pentaho/visual/role/Property",
          modes: [{dataType: "number"}],
          isRequired: true,
          ordinal: 10
        },
        {
          name: "multi",
          base: "pentaho/visual/role/Property",
          modes: [{dataType: "list"}],
          ordinal: 20
        },
        //End Visual Roles
        {
          name: "layoutMode",
          valueType: LayoutMode,
          isRequired: true,
          defaultValue: "squarify"
        },
        {
          name: "viewSize",
          valueType: "boolean",
          isRequired: false,
          defaultValue: false
        },
        {
          name: "labelsOption",
          isBrowsable: false
        },
        {
          name: "measures",
          isBrowsable: false
        }
      ]
    }
  })
    .localize({$type: bundle.structured.Treemap})
    .configure();
});
