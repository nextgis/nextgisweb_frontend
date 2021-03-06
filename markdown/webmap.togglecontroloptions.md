<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@nextgis/webmap](./webmap.md) &gt; [ToggleControlOptions](./webmap.togglecontroloptions.md)

## ToggleControlOptions interface

Options for creating a [toggle control](./webmap.webmapcontrols.createtogglecontrol.md) to layout customization and assigning a callback function

<b>Signature:</b>

```typescript
export interface ToggleControlOptions 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [addClass?](./webmap.togglecontroloptions.addclass.md) | string | <i>(Optional)</i> Additional css class string |
|  [addClassOff?](./webmap.togglecontroloptions.addclassoff.md) | string | <i>(Optional)</i> Additional css class string for <code>off</code> state only. |
|  [addClassOn?](./webmap.togglecontroloptions.addclasson.md) | string | <i>(Optional)</i> Additional css class string for <code>on</code> state only. |
|  [getStatus?](./webmap.togglecontroloptions.getstatus.md) | () =&gt; boolean | <i>(Optional)</i> Get current control status. |
|  [html?](./webmap.togglecontroloptions.html.md) | [HtmlDef](./webmap.htmldef.md) \| [HtmlToggle](./webmap.htmltoggle.md) | <i>(Optional)</i> Button content, can be set for each state (<code>on</code> or <code>off</code>). |
|  [onClick?](./webmap.togglecontroloptions.onclick.md) | [OnClick](./webmap.onclick.md) | <i>(Optional)</i> Set an action to execute when button clicked. |
|  [status?](./webmap.togglecontroloptions.status.md) | boolean | <i>(Optional)</i> Boolean state of control. |
|  [title?](./webmap.togglecontroloptions.title.md) | string \| [TitleToggle](./webmap.titletoggle.md) | <i>(Optional)</i> Button HTMLElement title, can be set for each state (<code>on</code> or <code>off</code>). |

