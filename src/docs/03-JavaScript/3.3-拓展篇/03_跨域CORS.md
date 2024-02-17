# 跨域问题

在Web开发中，使用 `fetch` 向另一个网站发送请求时，可能会遇到**跨域问题**。

跨域问题的产生与浏览器的**同源策略**密切相关，同源策略要求协议、域和端口都相同，否则就是跨域。

为了解决跨域问题，需要遵循 **CORS** （**跨域资源共享** Cross - Origin - Resource Sharing）的规范。

**同源策略的核心原则：**

- **源（Origin）：** 一个源由协议、域和端口组成。
- **域名（domain）**：两个页面的域名必须相同。
- **端口（port）**：如果一个页面使用了非标准端口（不是 `80` 或 `443`），则另一个页面的端口也必须相同。
- **协议（protocol）**： 两个页面的协议必须相同（如都是 `http` 或都是 `https`）。

## 跨域请求分类

> 从浏览器角度来看，分为两种跨源请求：安全请求 / 其他非安全请求

### 安全请求

一个请求被认为是安全的，需要满足以下条件：

1. 请求方法：GET、POST、HEAD
2. 请求头：
   - `Accept`，`Accept-Language`，`Content-Language`
   - `Content-Type` 的值为 `application/x-www-form-urlencoded`，`multipart/form-data`，`text/plain`

除此之外，其他所有的请求都被认为是 “非安全” 的请求

#### 浏览器端处理

当产生跨域请求时，浏览器会在请求头（request header）添加 `Origin` 信息，包含确切的源信息（协议、端口、域），没有路径信息。

例如：

我们从 `https://example.com/page` 请求 `https://anywhere.com/request`，请求头将如下所示：

```http
GET /request
Host: anywhere.com
Origin: https://example.com/
...
```

#### 服务器端处理

服务器会检查 `Origin` ，如果同意该请求，会在响应头（response header）中添加 `Access-Control-Allow-Origin`，值为允许的源（`https://example.com/`），或者为 `*` 表示任意源。

响应示例：

```http
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://example.com/
```

**浏览器扮演 信任中间人 的角色：**

1. 确保发送的跨域请求带有正确的 `Origin`。
2. 检查响应中的许可（`Access-Control-Allow-Origin`），存在放行，否则报错。

#### 响应头

默认情况下，JavaScript 只能访问 “安全的” 响应头，例如：

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

访问其他的 响应头 都会失败导致 error

>**请注意：**
>
>列表中没有 `Content-Length` 响应头！
>
>该 header 包含完整的响应长度。因此，如果我们正在下载某些内容，并希望跟踪进度百分比，则需要额外的权限才能访问该 header（请见下文）。

要授予 JavaScript 对任何其他 响应头 的访问权限，服务器必须发送 `Access-Control-Expose-Headers` ，包含可访问的非安全响应头列表。

示例：

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key
```

该示例中：有了 `Access-Control-Expose-Headers` ，此脚本就被允许读取响应头的 `Content-Length` 和 `API-Key` 。

### 非安全请求

对于非安全请求，浏览器会在请求之前发出初步的“预检”请求：

#### Step.1 预检请求

浏览器将具有以下 header 的 `OPTIONS 请求` 发送到相同的 URL地址：

- `Access-Control-Request-Method`: 包含的请求方法
- `Access-Control-Request-Headers`: 以逗号分隔的“非安全” header 列表

#### Step.2 预检响应

如果服务器同意该请求，则进行响应，响应状态码为 200，没有响应体 及 具有如下header：

- `Access-Control-Allow-Origin` 必须为 `*` 或进行请求的源（例如 `https://javascript.info`）才能允许此请求。
- `Access-Control-Allow-Methods`: 带有允许的方法的列表
- `Access-Control-Allow-Headers`: 带有允许的 header 的列表
- `Access-Control-Max-Age`: 可以指定缓存此权限的秒数

#### Step.3 实际请求

然后，发送实际的请求，并应用之前的“安全”方案。

>预检请求发生在“幕后”，它对 JavaScript 不可见。
>
>JavaScript 仅获取对主请求的响应，如果没有服务器许可，则获得一个 error。

## 凭证 (Credentials) - cookie

通常，对 某域 的请求附带有该域的所有 cookie。但是，默认情况下，由 JavaScript 发起的跨域请求 不会携带任何的凭证（cookie 或 HTTP认证（HTTP authentication））

例如，`fetch('http://another.com')` 不会发送任何 cookie，即使这些 cookie 本就属于 `another.com` 域的。

> 这是因为具有凭据的请求比没有凭据的请求要强大得多。如果被允许，它会使用它们的凭据授予 JavaScript 代表用户行为和访问敏感信息的全部权力。

### 浏览器端处理

如果我们要在 `fetch` 中发送凭据，则需要添加 `credentials: "include"` 选项，像这样：

```js
fetch('http://another.com', {
  credentials: "include"
});
```

现在，`fetch` 会把源自 `another.com` 的 cookie 和我们的请求发送到该网站。

> **`XMLHttpRequest` 需要将 `xhr.withCredentials` 设置为 `true`**

### 服务器端处理

如果服务器同意 **带有凭据** 的请求，则除了 `Access-Control-Allow-Origin` 外，服务器还应该在响应头中添加 `Access-Control-Allow-Credentials: true`。

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

> 请注意：对于具有凭据的请求，禁止 `Access-Control-Allow-Origin` 使用星号 `*`。如上所示，它必须有一个确切的源。这是另一项安全措施，以确保服务器真的知道它信任的发出此请求的是谁。
