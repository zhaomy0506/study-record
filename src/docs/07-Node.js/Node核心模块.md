# Node 核心模块(内置模块)

内置模块是由 Node 官方提供的。常见的有 `fs`、`path`、`http` 等。

## fs模块（File System）

> **fs模块 文件系统 —— 对文件的操作**

- 文件读取 `fs.readFile`

  ```js
  fs.readFile(filePath,[encoding],[callback(error,data)]
  //第一个必选参数:表示读取的文件路径。
  //第二个参数:是可选的，表示文件字符编码（例如：Utf-8）。
  //第三个参数`callback`是回调函数，用于接收文件的内容（回调函数的两个参数 error 和 data ， err 表示错误的提示，有则出错无则没有错误；data 是文件内容。 如果指定 encoding ， data是一个解析后的字符串，否则表示二进制数据）。
  ```

- 文件写入 `fs.writeFile`

  ```js
  fs.writeFile(filename,data,[options],callback)
  //第一个必选参数:表示读取的文件名
  //第二个参数:要写的数据
  //第三个参数:是一个对象
  ```

- 文件追加 `fs.appendFile`

  ```js
  fs.appendFile(filename, data, [options], callback)
  //第一个必选参数:表示读取的文件名
  //第二个参数:可以是任意字符串或者缓存
  //第三个参数 option 是一个对象，与write的区别就是[options]的flag默认值是”a”，所以它以追加方式写入数据.
  ```

## path 模块

> **path模块包含了一系列处理和转换文件路径的工具集合，不同操作系统的路径分隔符是不同的。 window下是\ linux是/。**

可以在引入模块的时候 `import path from "node:path/posix";` 添加 `posix` 可以使得读取的路径分隔符变为 `/`