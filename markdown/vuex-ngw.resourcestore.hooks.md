<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/vuex-ngw](./vuex-ngw.md) &gt; [ResourceStore](./vuex-ngw.resourcestore.md) &gt; [hooks](./vuex-ngw.resourcestore.hooks.md)

## ResourceStore.hooks property

<b>Signature:</b>

```typescript
hooks: {
        onNewItem?: (opt: PatchOptions<G, P>) => Promise<void>;
        onBeforeDelete?: (opt: {
            fid: number;
        }) => Promise<void>;
        onBeforePatch?: (data: Partial<FeatureItem<P, Geometry>>[], opt: {
            id: number;
        }) => Promise<void>;
        delete?: (resourceId: number, featureId: number) => Promise<void>;
    };
```
