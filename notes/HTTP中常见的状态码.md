
# HTTP 之常见的状态码

1xx
(Informational) 信息性状态码，表示正在处理。

100 Continue
初始的请求已经接受，客户应当继续发送请求的其余部分

101 Switching Protocols
服务器将遵从客户的请求转换到另外一种协议

2xx
(Success) 成功状态码，表示请求正常。

200 ok 请求被成功处理。

201 Created
服务器已经创建了文档，Location头给出了它的URL。

202 Accepted
已经接受请求，但处理尚未完成。

203 Non-Authoritative Information
文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝

204 No Content 该状态码表示服务器接收到的请求已经处理完毕，但是服务器不需要返回响应体。

206 Partial Content 该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的GET请求。

3xx
(Redirection) 重定向状态码，表示客户端需要进行附加操作。

300 Multiple Choices
客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。

301 Moved Permanently 永久性重定向。

302 Found 临时性重定向。

304 Not Modified
客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。

305 Use Proxy
客户请求的文档应该通过Location头所指明的代理服务器提取

307 Temporary Redirect
和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是 POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码： 当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。

4xx
(Client Error) 客户端错误状态码，表示服务器无法处理请求。

400 Bad Request 指出客户端请求中的语法错误。
401 Unauthorized 该状态码表示发送的请求需要有认证。
403 Forbidden 该状态码表明对请求资源的访问被服务器拒绝了。
404 Not Found 该状态码表明服务器上无法找到指定的资源。

5xx
(Server Error) 服务器错误状态码，表示服务器处理请求出错。

500 Internal Server Error 该状态码表明服务器端在执行请求时发生了错误。
502 Bad Gateway 该状态码表明服务器网关错误。
503 Service Unavailable 该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。


100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "reset content"
206 "partial content"
207 "multi-status"
208 "already reported"
226 "im used"
300 "multiple choices"
301 "moved permanently"
302 "found"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
308 "permanent redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request timeout"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "payload too large"
414 "uri too long"
415 "unsupported media type"
416 "range not satisfiable"
417 "expectation failed"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway timeout"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
508 "loop detected"
510 "not extended"
511 "network authentication required"
md