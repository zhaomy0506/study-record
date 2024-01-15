# Frame 弹窗

打开一个弹窗非常简单，只需要运行：

```js
window.open('https://javascript.info/')
```

……它将打开一个具有给定 URL 的新窗口。大多数现代浏览器都配置为在新选项卡中打开 url，而不是单独的窗口。

## 阻止弹窗

> **如果弹窗是在用户触发的事件处理程序（如 `onclick`）之外调用的，大多数浏览器都会阻止此类弹窗。**

例子：

```js
// 弹窗被阻止
window.open('https://javascript.info');

// 弹窗被允许
button.onclick = () => {
  window.open('https://javascript.info');
};
```

## window.open 方法

打开一个弹窗的语法是 `window.open(url, name, params)`：

参数说明：

1. `url` —— 要在新窗口中加载的 URL

2. `name` —— 新窗口的名称。

   每个窗口都有一个 `window.name`，在这里我们可以指定哪个窗口用于弹窗。

3. `params` —— 新窗口的配置字符串。它包括设置，用逗号分隔。

   - 位置:
     - `left/top`（数字）—— 屏幕上窗口的左上角的坐标。这有一个限制：不能将新窗口置于屏幕外（offscreen）。
     - `width/height`（数字）—— 新窗口的宽度和高度。宽度/高度的最小值是有限制的，因此不可能创建一个不可见的窗口。
   - 窗口功能：
     - `menubar`（yes/no）—— 显示或隐藏新窗口的浏览器菜单。
     - `toolbar`（yes/no）—— 显示或隐藏新窗口的浏览器导航栏（后退，前进，重新加载等）。
     - `location`（yes/no）—— 显示或隐藏新窗口的 URL 字段。Firefox 和 IE 浏览器不允许默认隐藏它。
     - `status`（yes/no）—— 显示或隐藏状态栏。同样，大多数浏览器都强制显示它。
     - `resizable`（yes/no）—— 允许禁用新窗口大小调整。不建议使用。
     - `scrollbars`（yes/no）—— 允许禁用新窗口的滚动条。不建议使用。


```js
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

## 关闭弹窗

关闭一个窗口：`win.close()`。

检查一个窗口是否被关闭：`win.closed`。

从技术上讲，`close()` 方法可用于任何 `window`，但是如果 `window` 不是通过 `window.open()` 创建的，那么大多数浏览器都会忽略 `window.close()`。因此，`close()` 只对弹窗起作用。