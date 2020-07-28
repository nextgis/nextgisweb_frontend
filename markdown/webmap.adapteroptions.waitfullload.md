<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/webmap](./webmap.md) &gt; [AdapterOptions](./webmap.adapteroptions.md) &gt; [waitFullLoad](./webmap.adapteroptions.waitfullload.md)

## AdapterOptions.waitFullLoad property

Wait until the layer data is fully loaded before allowing added to the map.

<b>Signature:</b>

```typescript
waitFullLoad?: boolean;
```

## Remarks

If true, addLayer promise resolve only after data loading. This is useful for GeoJson vector layer adapters when you need to process downloaded data before displaying.
