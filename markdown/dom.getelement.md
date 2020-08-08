<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/dom](./dom.md) &gt; [getElement](./dom.getelement.md)

## getElement() function

Helper function for determining the HTML element through the transmitted parameters

<b>Signature:</b>

```typescript
export declare function getElement(el: HTMLElement | string): HTMLElement | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  el | HTMLElement \| string |  |

<b>Returns:</b>

HTMLElement \| undefined

## Example


```javascript
let el = getElement(HTMLElement || 'element-id');
el = getElement('#element-id .sub-class');
el = getElement('.element-class');

```
