!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@nextgis/ngw-connector")):"function"==typeof define&&define.amd?define(["@nextgis/ngw-connector"],t):"object"==typeof exports?exports.NgwKit=t(require("@nextgis/ngw-connector")):e.NgwKit=t(e["@nextgis/ngw-connector"])}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t),r.d(t,"fixUrlStr",function(){return u});var n=r(0),i=r.n(n),o=function(){return(o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},a=function(){function e(e){this.options={},this.pixelRadius=10,this.options=o({},this.options,e),this.options.pixelRadius&&(this.pixelRadius=e.pixelRadius),this.url=this.options.baseUrl,this.resourceId=e.resourceId,this.connector=new i.a({baseUrl:this.url,auth:this.options.auth})}return e.getLayerAdapterOptions=function(t,r,n){var i=t.adapter||"IMAGE",o=n,a=!r.map.layerAdapters||r.map.layerAdapters.IMAGE;if("IMAGE"===i){if(a)return{url:o+="/api/component/render/image",id:String(t.id),resourceId:t.id,updateWmsParams:function(r){return e.updateWmsParams(r,t.id)}};i="TILE"}if("TILE"===i)return{url:o+="/api/component/render/tile?z={z}&x={x}&y={y}&resource="+t.id,id:String(t.id),adapter:i,layer_adapter:i}},e.addNgwLayer=function(t,r,n){var i=t.adapter||"IMAGE";if("IMAGE"===i||"TILE"===i)return r.map.addLayer(i,e.getLayerAdapterOptions(t,r,n));throw new Error(i+" not supported yet. Only TILE")},e.prototype.getSettings=function(e){var t=this;return new Promise(function(r){t.connector.request("resource.item",{id:t.resourceId}).then(function(n){var i=n.webmap;i&&(t._updateItemsParams(i.root_item,e),r(n.webmap))})})},e.prototype.onMapClick=function(e,t){},e.prototype.sendIdentifyRequest=function(e,t,r){if(void 0===r&&(r={}),t.map.requestGeomString){t.emitter.emit("start-identify",{ev:e});var n=t.map.requestGeomString(e.pixel,this.pixelRadius),i=r.layers;i||(i=t.layers.tree.getDescendants().filter(function(e){return"layer"===e.item.item_type&&e.properties.get("visibility")}).map(function(e){return String(Number(e.item.layer_style_id)-1)}));var o={geom:n,srs:3857,layers:i};return this.connector.post("feature_layer.identify",{data:o}).then(function(r){return t.emitter.emit("identify",{ev:e,data:r}),r})}},e.prototype._updateItemsParams=function(t,r){var n=this;if(t)if(t.children)t.children=t.children.map(function(e){return n._updateItemsParams(e,r)});else if("layer"===t.item_type){var i=u(this.url+"/api/component/render/image");t.url=i,t.resourceId=t.layer_style_id,t.updateWmsParams=function(r){return e.updateWmsParams(r,t.resourceId)},t=o({},t,e.getLayerAdapterOptions({adapter:t.layer_adapter.toUpperCase(),id:t.layer_style_id},r,this.options.baseUrl))}return t},e.updateWmsParams=function(e,t){return{resource:t,extent:e.bbox,size:e.width+","+e.height,timestamp:Date.now()}},e}();function u(e){return e.replace(/([^:]\/)\/+/g,"$1")}t.default=a}]).default});
//# sourceMappingURL=ngw-kit.js.map