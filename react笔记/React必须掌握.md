1. 数据驱动UI
2. state&props区别
3. 生命周期
4. useEffect返回值，第二个参数
5. 常用hooks
6. 父子组件通信
7. Content&redux
8. redux发送异步请求
9. ant design
10. 性能优化

...

11. HOC
12. saga
13. dva

### web基础&HTTP协议

1. cookie&session
2. 本地hosts绑定
3. User Agent
4. MIME Type
5. HTTP状态码
6. 客户的缓存
7. GET POST 协议区别、限制、语义
8. 无状态是什么意思
9. gzip是做什么的
10. XSS与CSRF
11. 跨域及解决



HTML

1. defer & async

   Defer 属性：解决脚本文件下载阻塞网页渲染的问题，它的的作用时延迟脚本的执行，等到DOM生成后，再执行脚本

   - 下载的脚本文件的时候不会不会阻塞页面渲染，在DOMContentLoaded事件触发前执行（刚刚读取完</html>）
   - 内置而不是外部加载和动态script标签defer属性没用

   async属性：解决阻塞的另一属性，作用是使用另一个进程下载下载脚本，下载时不会阻塞渲染。

   - 这个属性无法保证脚本的执行顺序，先下载结束先执行
   - defer&async, 如果脚本之间没有相互依赖关系，就使用async，如果脚本之间有依赖关系就使用defer

2. Fetch API & 使用

2. Localstorage & SessionStorage
3. postMessage
4. 自定义属性 data=*
5. Document Type
6. 转义&实体字符
7. 语义化