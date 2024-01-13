# Webpack📦

Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。它可以将多个模块（文件）打包成一个或多个 bundle，以优化加载性能

## 核心概念

1. **入口（Entry）**👋

   入口文件是你的应用程序开始的地方。Webpack 会从这个文件开始，逐步找出所有依赖的文件，然后将它们打包在一起。

2. **输出（Output）**📤

   告诉Webpack打包完成后生成的文件应该放在哪里，以及它们的文件名。

3. **加载器（Loaders）**⚙️

   加载器使得Webpack能够理解和处理不同类型的文件，如转换Sass到CSS、将ES6代

4. **插件（Plugins）**🔌

   插件可以执行各种自动化任务，例如生成HTML文件、清理旧文件、提取CSS等

5. **模式（Mode）**🔄

   通过指定 `development`、`production` 或 `none` 来设置构建模式

   根据你的需求，选择不同的模式可以影响Webpack的构建行为。开发模式帮助你更方便地进行调试，生产模式则会优化输出文件以减小文件大小。

## 常见配置属性

| 属性名   | 描述                       |
| -------- | -------------------------- |
| entry    | 指定入口文件路径或文件数组 |
| output   | 定义输出文件配置           |
| module   | 配置模块处理规则           |
| plugins  | 配置插件                   |
| resolve  | 配置模块路径解析           |
| devServe | 配置开发服务器             |

## 基本使用

1. 安装Webpack

```bash
# 初识化文件夹
npm init -y
# 使用npm或yarm安装Webpack和其命令行工具
npm i webpack webpack-cli --save-dev
```

2. 创建 `webpack.config.js`	

   在项目根目录下创建 `webpack.config.js` 文件，配置打包选项：

```js
const path = require('path')//引入node中path模块,用于处理文件

module.exports = {
	//入口文件 - 打包什么?
    entry:'./src/main.js',
    //出口文件
    output:{
        path:path.join(__dirname,'dist'),//添加文件夹
        filename:'[name].js' //打包后的文件名
    },
}
```

3. 配置`package.json`

   在 `package.json` 文件中配置构建命令

```json
"script":{
    "build":"webpack --config webpack.config.js"
}
```

## 详解

### entry

该属性用于指定打包应用程序入口文件,是webpack打包应用程序的起点

可以有三种写法：

使用字符串路径指定单个入口文件：

```js
module.exports = {
    entry: './src/index.js'
}
```

使用数组指定多个入口文件：

```js
module.exports = {
    entry: ['./src/index.js','./src/a.js']
}
```

使用对象指定多个入口文件并为它们命名

```js
module.exports = {
    entry: {
        main:'./src/index.js',
        a: './src/a.js',
    }
}
```

### 插件

使用 `html-webpack-plugin` 插件自动引入文件到 index.html件

```bash
npm i html-webpack-plugin -D #-D == --save-dev
```

在配置中使用：

```js
const HTMLWebPackPlugin = require('html-webpack-plugin')
module.exports = {
	plugins : [
        //插件实例
        new HTMLWebPackPlugin({
            template:"./public/index.html"//指定引入的文件
        })
    ]
}
```

清理输出目录无用文件，使用 `clean-webpack-plugin` 插件：

```bash
npm i clean-webpack-plugin -D
#这个插件用于每次构建前清理输出目录，以确保旧文件不会干扰新的构建。
```

### resolve

处理路径缩写，使用别名来简化路径：

```js
resolve: {
//忽略js后缀,vue后缀
	extensions: [".js", ".vue"],
    //别名
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
};

```

### devserver

配置开发服务器：

安装 `webpack-dev-server` 插件：

```bash
npm i webpack-dev-server -D
```

在配置中使用：

```js
devServer: {
    //port 是指定开发服务器的端口号
    port: 8080,
    //open 是决定是否自动在浏览器中打开项目。
    open: true
}
```

## 环境判断

development 开发环境

production 生产环境

`process.env.NODE_ENV` 是一个Node.js中的环境变量，用于指示当前代码所运行的环境类型。

