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
  "./Abstract"
], function (module, BaseView) {

  return BaseView.extend(module.id, {
    _cccClass: "BulletChart",

    _roleToCccRole: {
      "rows": "title",
      "columns": "subTitle",
      "measures": "value",
      "ranges": "range",
      "markers": "marker"
    },
    _multiRole: null,

  //   _prepareLayout: function(options){

  //     this.base(options);

  //     var vizOptions = this._vizOptions;

  //     var isVertical = options.orientation === 'vertical';
  //     if (this._resultset.length > 20) {
  //         options.bulletSize = 10;
  //         options.bulletSpacing = isVertical ? 60 : 20;
  //     } else if (this._resultset.length > 10) {
  //         options.bulletSize = 15;
  //         options.bulletSpacing = isVertical ? 80 : 30;
  //     } else {
  //         options.bulletSize = 20;
  //         options.bulletSpacing = isVertical ? 120 : 50;
  //     }

  //     var totalSpace = (2 + options.bulletSize + options.bulletSpacing) *
  //                      this._resultset.length;

  //     // TODO: vizOptions.controller.domNode
  //     if (isVertical) {
  //         if (totalSpace > options.width) {
  //             vizOptions.controller.domNode.style.overflowX = 'auto';
  //             vizOptions.controller.domNode.style.overflowY = 'hidden';

  //             options.width = totalSpace;
  //         }
  //     } else {
  //         if (totalSpace > options.height) {
  //             vizOptions.controller.domNode.style.overflowY = 'auto';
  //             vizOptions.controller.domNode.style.overflowX = 'hidden';

  //             options.height = totalSpace;
  //         }
  //     }
  // }
  })
      .implement(module.config);
});
