<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/utils](./utils.md)

## utils package

## Classes

|  Class | Description |
|  --- | --- |
|  [Clipboard\_2](./utils.clipboard_2.md) |  |
|  [Events](./utils.events.md) |  |

## Functions

|  Function | Description |
|  --- | --- |
|  [\_allProperties(obj, \_props)](./utils._allproperties.md) |  |
|  [allProperties(obj)](./utils.allproperties.md) |  |
|  [applyMixins(derivedCtor, baseCtors, opt)](./utils.applymixins.md) |  |
|  [arrayChunk(arr, size)](./utils.arraychunk.md) |  |
|  [arrayCompare(array1, array2)](./utils.arraycompare.md) | Comparison of the contents of two arrays. Position of elements is ignored. |
|  [arrayCompareStrict(array1, array2)](./utils.arraycomparestrict.md) | Comparing content and position of elements of two arrays. |
|  [arrayUnique(arr)](./utils.arrayunique.md) |  |
|  [bindAll(fns, context)](./utils.bindall.md) | Given an array of member function names as strings, replace all of them with bound versions that will always refer to <code>context</code> as <code>this</code>. This is useful for classes where otherwise event bindings would reassign <code>this</code> to the evented object or some other value: this lets you ensure the <code>this</code> value always. Taken from: https://github.com/mapbox/mapbox-gl-js/blob/v1.0.0/src/util/util.js\#L243 |
|  [camelize(str)](./utils.camelize.md) |  |
|  [capitalize(str)](./utils.capitalize.md) |  |
|  [coordinatesCount(geojson)](./utils.coordinatescount.md) |  |
|  [debounce(cb, wait)](./utils.debounce.md) |  |
|  [DebounceDecorator(wait)](./utils.debouncedecorator.md) |  |
|  [debugLog(message)](./utils.debuglog.md) |  |
|  [deepmerge(x, y, mergeArray)](./utils.deepmerge.md) |  |
|  [defined(val)](./utils.defined.md) | from https://github.com/CesiumGS/cesium/blob/master/Source/Core/defined.js |
|  [degrees2meters(lng, lat)](./utils.degrees2meters.md) |  |
|  [degrees2Radian(deg)](./utils.degrees2radian.md) |  |
|  [deprecatedMapClick(ev)](./utils.deprecatedmapclick.md) |  |
|  [deprecatedWarn(message)](./utils.deprecatedwarn.md) |  |
|  [eachCoordinates(geojson, cb)](./utils.eachcoordinates.md) |  |
|  [eachGeometry(geojson, cb)](./utils.eachgeometry.md) |  |
|  [fixUrlStr(url)](./utils.fixurlstr.md) |  |
|  [flatten(data)](./utils.flatten.md) |  |
|  [full(val)](./utils.full.md) | from https://github.com/CesiumGS/cesium/blob/master/Source/Core/defined.js |
|  [getBoundsCoordinates(b)](./utils.getboundscoordinates.md) |  |
|  [getBoundsFeature(b)](./utils.getboundsfeature.md) |  |
|  [getBoundsPolygon(b)](./utils.getboundspolygon.md) |  |
|  [getCircleFeature(lng, lat, radius, points)](./utils.getcirclefeature.md) |  |
|  [getCirclePolygonCoordinates(lng, lat, radius, points)](./utils.getcirclepolygoncoordinates.md) |  |
|  [getCoordinates(geojson)](./utils.getcoordinates.md) |  |
|  [getGlobalVariable()](./utils.getglobalvariable.md) |  |
|  [getPolygons(geojson)](./utils.getpolygons.md) |  |
|  [isAnyJson(val)](./utils.isanyjson.md) |  |
|  [isArray(val)](./utils.isarray.md) |  |
|  [isJsonArray(val)](./utils.isjsonarray.md) |  |
|  [isJsonMap(val)](./utils.isjsonmap.md) |  |
|  [isObject(val)](./utils.isobject.md) |  |
|  [isObjKey(obj, key)](./utils.isobjkey.md) |  |
|  [keyInObj(obj, key)](./utils.keyinobj.md) |  |
|  [latLngToLngLatArray(latLng)](./utils.latlngtolnglatarray.md) |  |
|  [lngLatArrayToLatLng(coord)](./utils.lnglatarraytolatlng.md) |  |
|  [meters2degrees(x, y)](./utils.meters2degrees.md) |  |
|  [mixinProperties(derivedCtor, baseCtor, properties)](./utils.mixinproperties.md) |  |
|  [numberWithSpaces(x)](./utils.numberwithspaces.md) |  |
|  [objectAssign(target, source)](./utils.objectassign.md) |  |
|  [objectAssign(target, source1, source2)](./utils.objectassign_1.md) | Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object. |
|  [objectAssign(target, source1, source2, source3)](./utils.objectassign_2.md) | Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object. |
|  [objectDeepEqual(o, p)](./utils.objectdeepequal.md) |  |
|  [reEscape(s)](./utils.reescape.md) |  |
|  [round(val, toFixed)](./utils.round.md) |  |
|  [sleep(delay)](./utils.sleep.md) |  |
|  [unflatten(data)](./utils.unflatten.md) |  |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [ApplyMixinOptions](./utils.applymixinoptions.md) |  |
|  [JsonMap](./utils.jsonmap.md) |  |
|  [LatLng](./utils.latlng.md) | Longitude and latitude coordinate, measured in degrees. |
|  [TileJson](./utils.tilejson.md) | This specification attempts to create a standard for representing metadata about multiple types of web-based layers, to aid clients in configuration and browsing.<!-- -->From [https://github.com/mapbox/tilejson-spec/tree/master/2.2.0](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0) |

## Variables

|  Variable | Description |
|  --- | --- |
|  [EARTHS\_RADIUS](./utils.earths_radius.md) | Radius of the earth in kilometers |
|  [isBrowser](./utils.isbrowser.md) |  |
|  [type](./utils.type.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [AnyJson](./utils.anyjson.md) |  |
|  [DeepPartial](./utils.deeppartial.md) | Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties. |
|  [JsonArray](./utils.jsonarray.md) |  |
|  [LngLatArray](./utils.lnglatarray.md) | Array of two numbers representing longitude and latitude. |
|  [LngLatBoundsArray](./utils.lnglatboundsarray.md) | Array of coordinates, measured in degrees, in \[west, south, east, north\] order. [GeoJSON standard](https://tools.ietf.org/html/rfc7946#section-5) |
|  [Position](./utils.position.md) | A Position is an array of coordinates. [GeoJSON standard](https://tools.ietf.org/html/rfc7946#section-3.1.1) Array should contain between two and three elements. The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values), but the current specification only allows X, Y, and (optionally) Z to be defined. |
|  [Type](./utils.type.md) |  |
|  [ZoomLevel](./utils.zoomlevel.md) | Map zoom level. |

