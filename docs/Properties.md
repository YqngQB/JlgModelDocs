---
sidebarDepth: 2
---

# 属性

## Properties

#### `name: String` **required**

Modal的名称，必填。

---

#### `resizable: Boolean`

modal是否可调整大小。

---

#### `resizeEdges: Array<String>` `default: ['r', 'br', 'b', 'bl', 'l', 'tl', 't', 'tr']`

可以包含一个数组，其中包含希望Modal能够在其上调整大小的边缘。
| string | corner |
| ------- | ------------- |
| r | right |
| br | bottom right |
| b | bottom |
| bl | bottom left |
| l | left |
| t | top left |
| t | top |
| tr | top right |

---

#### `resizeIndicator: Boolean` `default: true`

启用 Resizable 时，启用Modal右下角的用于调整大小的小三角。

---

#### `centerResize: Boolean` `default: true`

在调整大小时启用Modal的自动居中。

---

#### `adaptive: Boolean`

启用响应行为，Modal将在可能的情况下尝试适应屏幕尺寸。属性 `maxHeight`、`maxWidth`、`minHeight`、`minWidth` 可以设置自动调整大小的边界。

---

#### `draggable: Boolean | String`

允许在屏幕边界内拖动模式。

Draggable 属性可以接受字符串参数 - 一个 CSS 选择器 **将用作拖动的“handler”的元素**.

```html
<modal name="bar" draggable=".window-header">
  <div class="window-header">DRAG ME HERE</div>
  <div>
     Example
  </div>
</modal>
```

---

#### `scrollable: Boolean`

当Modal的高度大于屏幕时，在Modal内启用滚动。

::: 注意
此功能仅在 `height` 设置为 `"auto"` 时有效

---

#### `focusTrap: Boolean`

启用focusTrap 表示只有在Modal窗口内的输入框或按钮才能通过按 Tab 键聚焦

---

#### `reset: Boolean`

在显示之前重置位置和大小

---

#### `clickToClose: Boolean` `default: true`

如果设置为`false`，则无法通过单击背景或按 Esc 键来关闭Modal。

---

#### `transition: String`

应用于Modal窗口的 CSS 过渡。

---

#### `overlayTransition: String`

应用于叠加层（背景）的 CSS 过渡。

---

#### `classes: String | Array`

将应用于Modal窗口的 class 列表 (不叠加).

---

#### `width: String | Number` `default: 600`

以像素或百分比为单位的宽度 (50, "50px", "50%").

支持的字符串值为 `<number>%` 和 `<number>px`

---

#### `height: String | Number` `default: 300`

以像素或百分比为单位的高度 (50, "50px", "50%") or `"auto"`.

支持的字符串值为 `<number>%`、`<number>px` 和 `auto`。将 height 设置为 `"auto"` 使其在内容高度变化时自动更改高度（和 `scrollable` 属性配合）。


---

#### `minWidth: Number (pixels)` `default: 0`

Modal可以调整到的最小宽度。

---

#### `minHeight: Number (pixels)` `default: 0`

Modal可以调整到的最小高度。

---

#### `maxWidth: Number (pixels)` `default: Infinity`

Modal的最大宽度（如果该值大于窗口宽度，则将使用窗口宽度。

---

#### `maxHeight: Number (pixels)` `default: Infinity`

Modal的最大高度（如果该值大于窗口高度，则将使用窗口高度。

---

#### `shiftX: Number (between 0 and 1.0)` `default: 0.5`

`%` 中的水平位置，默认为 `0.5`（表示Modal框将位于窗口的中间（左起 50%）

---

#### `shiftY: Number (between 0 and 1.0)` `default: 0.5`

`%` 中的垂直位置，默认为 `0.5`（表示Modal框将位于窗口的中间（距顶部 50%）。

---
