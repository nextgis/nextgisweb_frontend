(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@nextgis/ngw-connector')) :
  typeof define === 'function' && define.amd ? define(['exports', '@nextgis/ngw-connector'], factory) :
  (factory((global.NgwKit = {}),global.ngwConnector));
}(this, (function (exports,ngwConnector) { 'use strict';

  var NgwKit = (function () {
      function NgwKit(options) {
          this.url = options.baseUrl;
          this.resourceId = options.resourceId;
          this.connector = new ngwConnector.NgwConnector({ baseUrl: this.url });
      }
      NgwKit.prototype.getSettings = function () {
          var _this = this;
          return new Promise(function (resolve) {
              _this.connector.request('resource.item', function (data) {
                  var webmap = data.webmap;
                  if (webmap) {
                      _this._updateItemsUrl(webmap.root_item);
                      resolve(data.webmap);
                  }
              }, { id: _this.resourceId });
          });
      };
      NgwKit.prototype._updateItemsUrl = function (item) {
          var _this = this;
          if (item) {
              if (item.children) {
                  item.children.forEach(function (x) { return _this._updateItemsUrl(x); });
              }
              else if (item.item_type === 'layer' && item.layer_adapter === 'image') {
                  var url = fixUrlStr(this.url + '/api/component/render/image');
                  item.url = url;
              }
          }
      };
      return NgwKit;
  }());
  function fixUrlStr(url) {
      return url.replace(/([^:]\/)\/+/g, '$1');
  }

  exports.NgwKit = NgwKit;
  exports.fixUrlStr = fixUrlStr;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngw-kit.js.map
