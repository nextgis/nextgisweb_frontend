<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/webmap](./webmap.md)

## webmap package

The library that allows to use a single interface for managing various interactive map frameworks.

## Remarks

The following adapters are available: , ,  and experimental .

## Example


```js
import WebMap from "@nextgis/webmap";

import "./leaflet-style-override.css";
import MapAdapter from "@nextgis/leaflet-map-adapter";
// OR
// import 'ol/ol.css';
// import MapAdapter from '@nextgis/ol-map-adapter';
// OR
// import 'mapbox-gl/dist/mapbox-gl.css';
// import MapAdapter from '@nextgis/mapboxgl-map-adapter';

const webMap = new WebMap({
  mapAdapter: new MapAdapter(),
  mapOptions: { target: 'map' }
});

```

## Classes

|  Class | Description |
|  --- | --- |
|  [WebMap](./webmap.webmap.md) | The core component for managing map adapters. It contains methods for adding and manipulation with map layers and controls. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [AdapterOptions](./webmap.adapteroptions.md) |  |
|  [AppOptions](./webmap.appoptions.md) |  |
|  [AttributionControlOptions](./webmap.attributioncontroloptions.md) |  |
|  [BaseLayerAdapter](./webmap.baselayeradapter.md) |  |
|  [BaseMapEvents](./webmap.basemapevents.md) |  |
|  [ButtonControlOptions](./webmap.buttoncontroloptions.md) |  |
|  [CreateControlOptions](./webmap.createcontroloptions.md) |  |
|  [DataLoadError](./webmap.dataloaderror.md) |  |
|  [DialogAdapter](./webmap.dialogadapter.md) |  |
|  [DialogAdapterOptions](./webmap.dialogadapteroptions.md) |  |
|  [FilterOptions](./webmap.filteroptions.md) |  |
|  [FitOptions](./webmap.fitoptions.md) | Parameters that control how the fit to object will be work. |
|  [GeoJsonAdapterOptions](./webmap.geojsonadapteroptions.md) |  |
|  [GetAttributionsOptions](./webmap.getattributionsoptions.md) |  |
|  [HtmlToggle](./webmap.htmltoggle.md) |  |
|  [ImageAdapterOptions](./webmap.imageadapteroptions.md) |  |
|  [LatLng](./webmap.latlng.md) | Longitude and latitude coordinate, measured in degrees. |
|  [LayerAdapterCreators](./webmap.layeradaptercreators.md) |  |
|  [LayerAdapters](./webmap.layeradapters.md) |  |
|  [LayerAdaptersOptions](./webmap.layeradaptersoptions.md) |  |
|  [LayerDefinition](./webmap.layerdefinition.md) |  |
|  [Locate](./webmap.locate.md) |  |
|  [LocateOptions](./webmap.locateoptions.md) |  |
|  [LocationEvent](./webmap.locationevent.md) |  |
|  [LocationEvents](./webmap.locationevents.md) |  |
|  [MapAdapter](./webmap.mapadapter.md) | Parameters and methods that control the behavior of the map and the layers on it. |
|  [MapAdapterEvents](./webmap.mapadapterevents.md) |  |
|  [MapClickEvent](./webmap.mapclickevent.md) | Parameters passed to the arguments of the callback function when clicking on the map |
|  [MapControl](./webmap.mapcontrol.md) |  |
|  [MapControls](./webmap.mapcontrols.md) |  |
|  [MapOptions](./webmap.mapoptions.md) |  |
|  [Model3DOptions](./webmap.model3doptions.md) |  |
|  [MvtAdapterOptions](./webmap.mvtadapteroptions.md) |  |
|  [OnLayerClickOptions](./webmap.onlayerclickoptions.md) |  |
|  [OnLayerSelectOptions](./webmap.onlayerselectoptions.md) |  |
|  [Pixel](./webmap.pixel.md) | Screen coordinates in pixels. |
|  [PopupOptions](./webmap.popupoptions.md) |  |
|  [RasterAdapterOptions](./webmap.rasteradapteroptions.md) |  |
|  [RuntimeParams](./webmap.runtimeparams.md) |  |
|  [StarterKit](./webmap.starterkit.md) |  |
|  [TileAdapterOptions](./webmap.tileadapteroptions.md) |  |
|  [Tileset3DAdapterOptions](./webmap.tileset3dadapteroptions.md) |  |
|  [TitleToggle](./webmap.titletoggle.md) |  |
|  [ToggleControl](./webmap.togglecontrol.md) |  |
|  [ToggleControlOptions](./webmap.togglecontroloptions.md) |  |
|  [ToggleLayerOptions](./webmap.togglelayeroptions.md) |  |
|  [VectorAdapterOptions](./webmap.vectoradapteroptions.md) |  |
|  [VectorLayerAdapter](./webmap.vectorlayeradapter.md) |  |
|  [WebMapEvents](./webmap.webmapevents.md) |  |
|  [WmsAdapterOptions](./webmap.wmsadapteroptions.md) |  |
|  [ZoomControlOptions](./webmap.zoomcontroloptions.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [AdapterConstructor](./webmap.adapterconstructor.md) |  |
|  [CallbackFilter](./webmap.callbackfilter.md) |  |
|  [ControlPosition](./webmap.controlposition.md) |  |
|  [ControlPositions](./webmap.controlpositions.md) |  |
|  [Cursor](./webmap.cursor.md) | Available cursor names from https://developer.mozilla.org/ru/docs/Web/CSS/cursor  |
|  [DataLayerFilter](./webmap.datalayerfilter.md) |  |
|  [HtmlDef](./webmap.htmldef.md) |  |
|  [LayerAdapter](./webmap.layeradapter.md) |  |
|  [LayerAdapterDefinition](./webmap.layeradapterdefinition.md) |  |
|  [LayerDef](./webmap.layerdef.md) | Available argument types for methods with map layers identification. |
|  [LngLatArray](./webmap.lnglatarray.md) | Array of two numbers representing longitude and latitude. |
|  [LngLatBoundsArray](./webmap.lnglatboundsarray.md) | Array of coordinates, measured in degrees, in \[west, south, east, north\] order. https://tools.ietf.org/html/rfc7946\#section-5 |
|  [OnBeforeLayerAdd](./webmap.onbeforelayeradd.md) |  |
|  [OnClick](./webmap.onclick.md) |  |
|  [VectorAdapterLayerType](./webmap.vectoradapterlayertype.md) |  |
|  [ZoomLevel](./webmap.zoomlevel.md) |  |
