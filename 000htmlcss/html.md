### 1.标签语义化

- 代码结构更加清晰
- 见名知意，没有基础的人也能知道这部分代码是干嘛的
- 方便团队开发维护，代码可读性更强
- 有利于SEO优化，爬虫依赖于标签来确定上下文关系

### 2.meta标签

- meta标签提供关于html文档的元数据，不会显示在页面，但是对于机器是可读的，告诉浏览器怎么解析页面，告诉搜索引擎关键字（SEO优化）
- meta作用：告诉机器浏览器该如何解析该页面，描述这个页面的主要内容，可以设置服务器发送到浏览器的http头部内容
- `charset="utf-8"`设置页面使用的字符编码
- viewport 设置视口，移动端的适配 `<meta name="viewport" content="width=device-width,initial-scale=1.0">`

### 3.Canvas

- 绘图
- 游戏、图标制作、广告

### 4.CSS/JS引入位置

- script一般放在最后，可以提高用户体验，避免因js文件过大，页面渲染等待其加载，而不渲染结构，出现空白页
- css放在header标签中，DOM树渲染的同时，渲染样式，体验更好，效率更高

### 5.HTML 的块级元素，行内元素，行内块元素有哪些?区别是什么?

- 块级元素：div，h1-h6，p，ul，ol，dl，li，hr，dt，dd，form，table
  - 块元素独占一行
  - 宽高生效
  - 默认宽和父元素一样，内容撑开高度
  - margin，padding全部生效
- 行内元素：em，i，del，small，strong，ins，span，a
  - 宽高不生效
  - 左右margin生效上下不生效
  - 在一行排列
  - 大小靠内容撑开
  - padding都生效
- 行内块元素：img，input(表单元素，除去form)
  - 在一行排列
  - 宽高生效
  - margin，padding生效