# 从 Setup 开始

`setup`是`Vue3`中一个新的配置项，值是一个函数，它是 `Composition API` **“表演的舞台**_**”**_，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在`setup`中。

**特点：**

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

```vue
<script lang="ts">
    export default {
        name:'Person',
        setup(){
            // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
            let name = '张三'
            let age = 18
            let tel = '13888888888'

            // 方法，原来写在methods中
            function changeName(){
                name = 'zhang-san' //注意：此时这么修改name页面是不变化的
                console.log(name)
            }
            function changeAge(){
                age += 1 //注意：此时这么修改age页面是不变化的
                console.log(age)
            }
            function showTel(){
                alert(tel)
            }

            // 返回一个对象，对象中的内容，模板中可以直接使用
            return {name,age,tel,changeName,changeAge,showTel}
        }
    }
</script>
```

## setup 函数返回值

1. 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用**（重点关注）。**

2. 若返回一个**函数**：则可以自定义渲染内容，代码如下：

   ```js
   setup(){
     return ()=> '你好啊！'
   }
   ```

### 选项式API 与 Setup 关系

- `Vue2` 的配置（`data`、`methos`......）中**可以访问到** `setup`中的属性、方法。
- 但在`setup`中**不能访问到**`Vue2`的配置（`data`、`methos`......）。
- 如果与`Vue2`冲突，则`setup`优先。

## Setup语法糖

```vue
<script setup></script> <!-- 等同于上面的写法 -->
```

### 语法糖 拓展

上述代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化

1. `npm i vite-plugin-vue-setup-extend -D`

2. 第二步：`vite.config.ts`

   ```json
   import { defineConfig } from 'vite'
   import VueSetupExtend from 'vite-plugin-vue-setup-extend'
   
   export default defineConfig({
     plugins: [ VueSetupExtend() ]
   })
   ```

3. 之后就可以这样使用了`<script setup lang="ts" name="Person">`

