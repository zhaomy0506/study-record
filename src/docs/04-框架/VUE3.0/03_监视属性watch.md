# 监视属性 Watch

- `watch` 可以用来监视数据的变化(与vue2中的作用一致)

- Vue3 中的 `watch` 只能监视一下**四种数据**：

>1. `ref` 定义的数据
>2. `reactive` 定义的数据
>3. `getter`函数（函数返回一个值）
>4. 一个包含上述内容的数组

在 Vue3 中 是使用 `watch` 的时候，通常会遇到以下几种情况：

## 情况一

监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的改变。

>**关于如何解除监视**
>
>`watch` 函数会返回一个函数，调用此函数，即可停止对数据的监视

## 情况二

监视`ref`定义的【对象类型】数据：直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

>注意：
>
>* 若修改的是`ref`定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
>
>* 若修改整个`ref`定义的对象，`newValue` 是新值， `oldValue` 是旧值，因为不是同一个对象了。

## 情况三

监视`reactive`定义的【对象类型】数据，且默认开启了深度监视，并且无法关闭深度监视。

## 情况四

监视`ref`或`reactive`定义的【对象类型】数据中的**某个属性**，注意点如下：

1. 若该属性值**不是**【对象类型】，需要写成函数形式。
2. 若该属性值是**依然**是【对象类型】，可直接编，也可写成函数，**建议写成函数**。

>结论：
>
>​	监视的要是对象里的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视。

## 情况五

监视上述的多个数据

```vue
<template>
  <div class="person">
    <h1>情况五：监视上述的多个数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'

  // 数据
  let person = reactive({
    name:'张三',
    age:18,
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }
  function changeAge(){
    person.age += 1
  }
  function changeC1(){
    person.car.c1 = '奥迪'
  }
  function changeC2(){
    person.car.c2 = '大众'
  }
  function changeCar(){
    person.car = {c1:'雅迪',c2:'爱玛'}
  }

  // 监视，情况五：监视上述的多个数据
  watch([()=>person.name,person.car],(newValue,oldValue)=>{
    console.log('person.car变化了',newValue,oldValue)
  },{deep:true})

</script>
```

# watchEffect

> 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

对比 `watch`

>1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
>
>2. `watch`：要明确指出监视的数据
>
>3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。