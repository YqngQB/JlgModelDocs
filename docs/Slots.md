# Slots

## Close button

如果想在右上角有一个关闭（x）按钮，可以使用“top-right”插槽（这个基本用不上）。
```html{3-7}
<template>
  <modal name="foo">
    <div slot="top-right">
      <button @click="$modal.hide('foo')">
        ❌
      </button>
    </div>
    Hello, ☀️!
  </modal>
</template>
```
