<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/geocoder](./geocoder.md) &gt; [SearchItem](./geocoder.searchitem.md)

## SearchItem interface

<b>Signature:</b>

```typescript
export interface SearchItem 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [\_id?](./geocoder.searchitem._id.md) | number \| string | <i>(Optional)</i> |
|  [extent?](./geocoder.searchitem.extent.md) | [LngLatBoundsArray](./utils.lnglatboundsarray.md) | <i>(Optional)</i> |
|  [geom?](./geocoder.searchitem.geom.md) | GeoJsonObject | <i>(Optional)</i> |
|  [provider?](./geocoder.searchitem.provider.md) | [BaseProvider](./geocoder.baseprovider.md) | <i>(Optional)</i> |
|  [query](./geocoder.searchitem.query.md) | string |  |
|  [result?](./geocoder.searchitem.result.md) | () =&gt; CancelablePromise&lt;[ResultItem](./geocoder.resultitem.md)<!-- -->&gt; | <i>(Optional)</i> |
|  [text](./geocoder.searchitem.text.md) | string |  |

