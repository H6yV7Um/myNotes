
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

  302, 303, 307都是临时重定向. 发出一个GET或POST请求当返回该状态码后会获取header的location字段中的url地址, 重新发出一个GET请求到该新的地址

304 Not Modified
客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用. 

305 Use Proxy
客户请求的文档应该通过Location头所指明的代理服务器提取

307 Temporary Redirect
和302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是 POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码： 当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。

帮助记忆:

300 耳朵 - 2个西瓜 - 多项选择
302, 303, 307 
304 耳朵 - 小红旗 - 生锈的铁房子正在改造(修改), Not Modified

4xx
(Client Error) 客户端错误状态码，表示服务器无法处理请求。

400 Bad Request 指出客户端请求中的语法错误。
401 Unauthorized 该状态码表示发送的请求需要有认证。
403 Forbidden 该状态码表明对请求资源的访问被服务器拒绝了。 服务器拒绝请求
404 Not Found 该状态码表明服务器上无法找到指定的资源。
405 Method Not Allowed 
发起的请求中带有所请求的 URL 不支持的方法时，使用此状态码。应该在响应中包含 Allow 首部，以告知客户端对所请求的资源可以使用哪些方法。
406 Not Acceptable 客户端可以指定参数来说明它们愿意接收什么类型的实体。服务器
没有与客户端可接受的 URL 相匹配的资源时，使用此代码。通常，
服务器会包含一些首部，以便客户端弄清楚为什么请求无法满足。
408 request timeout

400 Bad Request 红旗 -- 西瓜 - 坏了(Bad request) - 树 (1) - 有锁 - 没带钥匙(Unauthorized) - 挠挠耳朵(3) - 看到一个锯(拒绝Forbidden) - 红色小旗(4) - 被煤油灯点着了(没有Not Found) - 钩子(5) - 方形的阀门一片红一片绿(方法不允许Method Not Allowed) - 葫芦(8) - 葫芦装的酒太满流出来了(timeout)

背着红旗的人 - 到西瓜地 - 西瓜坏了 - 西瓜旁边的树上有个门 - 门上有锁, 没钥匙打不开 - 感觉耳朵有点疼 - 一看耳朵上面有个锯, 锯子在锯自己的耳朵 - 锯子的木把被烧了 - 红旗着火了 - 因为红旗下面有个煤油灯正在点红旗 - 煤油灯挂在一个钩子上 - 钩子把挂在一个水管上, 水管有个方形的一片红一片绿的阀门(方法不允许) - 水管的水从一个葫芦里抽出来 - 葫芦太满了水都流出来了.

5xx
(Server Error) 服务器错误状态码，表示服务器处理请求出错。

500 Internal Server Error 该状态码表明服务器端在执行请求时发生了错误。
501 Not Implemented 
客户端发起的请求超出服务器的能力范围（比如，使用了服务器不支持的请求方法）时，使用此状态码
502 Bad Gateway 该状态码表明服务器网关错误。
作为代理或网关使用的服务器从请求响应链的下一条链路上收到了一条伪响应（比如，它无法连接到其父网关）时，使用此状态码
503 Service Unavailable 该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。
504 Gateway Timeout 
与状态码 408 类似，只是这里的响应来自一个网关或代理，它们在等待另一服务器对其请求进行响应时超时了
505 HTTP Version Not Supported
服务器收到的请求使用了它无法或不愿支持的协议版本时，使用此状态码。有些服务器应用程序会选择不支持协议的早期版本

帮助记忆
500 internal sever error 钩子 - 称西瓜 - 西瓜内部有个虫, 开始烂了 (内部错误)
502 钩子 - 鸭子 - 一群鸭子对着钩子在叫, 后面的鸭子听不见不回复 bad gateway 网关错误
503 service unavilable 钩子 - 耳朵 - 布,贝壳,蚕蛹.  钩子在对耳朵讲话, 耳朵被布包主听不见(服务停止), 布是从一个白色的贝壳嘴里拉出来的. 贝壳嘴里还有个蚕蛹正在抽丝做布.  服务可不用
504 gateway timeout 钩子 - 小旗 - 旗到了, 兵一直不到(迟到了, 服务超时) - gateway timeout


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
