# 缓存机制

## 目的

浏览器缓存是为了节约网络资源加速浏览，浏览器通过在本地磁盘或者内存将访问过的请求资源进行存储。
当用户下次访问时，可以在磁盘或内存直接获取，提高加载速度

## 缓存策略

浏览器缓存策略分：强缓存和协商缓存

**强缓存**

强缓存是浏览器根据服务器返回的响应头Expires和Cache-Control规则来决定是否从缓存读取内容

- Expires

Exipres是HTTP/1.0的网页缓存字段，它表示请求结果缓存的到期时间，当客户端时间小于Exipres时间，就返回缓存结果

- Cache-Control

Cache-Control是HTTP/1.1的字段，Expires可能因为客户端和服务器的时间不同步导致判断失效，所以出现了根据相对时间来判断更有效，`Cache-Control: max-age=86400`这里的86400表示的秒数，表示超过86400s后重新请求数据。

那么强缓存生效后，缓存到了哪里？

1. Memory Cache 内存缓存

- 缓存持续时间短：关闭进程后缓存释放
- 小型资源：体积较小的资源更有可能被缓存到内存中，因为内存的读写速度比磁盘快，可以提升性能。

2. Disk Cache 磁盘缓存

- 持续时间长
- 大型资源

_\*Cache-Control优先级高于Expires_

**协商缓存**

当强缓存失效时，才会使用协商缓存。协商缓存是有服务器根据缓存标识来决定是否使用缓存

- Last-Modified/if-Modified-Since

Last-Modified: 返回该资源文件在服务器最后的修改时间
if-Modified-Since: 上一次请求返回的Last-Modified

服务器接收请求后，发现携带if-Modified-Since标识，就会拿if-Modified-Since的值和该文件在服务器最后修改时间比较，当服务器最后修改时间大于f-Modified-Since的值，返回最新的资源，状态码为200。否则状态码为304，表示可以继续使用缓存文件

- Etag/if-None-Match

Etag: 表示资源文件的唯一标识
if-None-Match: 上一次请求的Etag

服务器接收请求后，发现携带if-None-Match标识，就会拿if-None-Match的值与该文件在服务器的Etag比较，一致则返回状态码304，表示可以继续使用缓存，不一致则返回状态码200，返回最新的资源。

_\*Etag优先级高于Last-Modified_
