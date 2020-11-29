<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/utils](./utils.md) &gt; [Position\_2](./utils.position_2.md)

## Position\_2 type

A Position is an array of coordinates. [GeoJSON standard](https://tools.ietf.org/html/rfc7946#section-3.1.1) Array should contain between two and three elements. The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values), but the current specification only allows X, Y, and (optionally) Z to be defined.

<b>Signature:</b>

```typescript
export declare type Position = [number, number];
```