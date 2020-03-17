### 1.盒模型，什么是标准 CSS 盒模型?

- margin     padding   border   content

- > 标准模式：盒子总宽度=width+padding+border+margin
  >
  > 怪异模式：盒子总宽度=width(包含padding+border)+margin

### 2.CSS3新特性

- border-radius圆角
- box-shadow阴影:x偏移量,y偏移量,阴影大小，透明度
- border-image边框图片
  - border-image: url() top right bottom left
  - border-width:  top right bottom left
- linear-gradient 线性渐变
  - background: linear-gradient(to position , color,color,...,color)
- radial-gradient 径向渐变
  - background: radial-gradient(shap size at position , color,color,...,color)
- text-shadow文字阴影
- 2D/3D transform：rotate(旋转)  scale(缩放)  translate(位移)
- @media媒体查询，根据屏幕宽度，设置，用来解决移动端适配,根据屏幕大小使相应的css生效
- flex布局(弹性盒子)

### 3.实现元素隐藏

- `display：none`
  - 该隐藏不占位，源码可见
- `visibility:hidden`
  - 该隐藏占位，源码可见
- `opacity:0`
  - 透明度为0，源码可见，占位
- `position:top:-9999px,left:-9999px`
  - 利用定位偏移，把元素移出视窗

### 4.实现元素水平居中垂直居中

- `text-align:center`行内元素
- `margin:0 auto;`  定宽块状元素
- `position:left:50% transform:translate(-50%)`
- 垂直居中：
  - 单行文本：`height = line-height`
  - `vertical-align:middle` 
  - `position:top:50% transform:translate(0,-50%)`

### 5.定位元素的水平垂直居中

- 1.宽高固定 ` position:absolute top:0,bottom:0,left:0,right:0 margin:auto`
- 2.` position:absolute top:50%,left:50% transform:translate(-50%,-50%)`
- 3.`display:flex; justify-content:center; align-items:center `
- 4.宽高固定：`position:absolute top:50%,left:50% margin:-toppx,0,0,-leftpx`

### 6.Position

- 四种定位
  - static,默认
  - relative相对定位，相对于自身原位置偏移，不脱标，不影响元素本身特性，提升层级z-index
  - absolute绝对定位，相对于已有定位的父元素偏移，都没有定位就相对于body进行定位，脱标
  - fixed固定定位，相对于视窗进行偏移，脱标

### 7.清除浮动

- 1.给父元素设置高度

- 2.给父元素添加 `overflow:hidden`属性

- 3.额外标签法：在子元素末尾添加一个标签，给标签添加一个样式，样式定义`clear:both`闭合浮动

- 4.伪元素清除浮动

  - ```css
    .clearfix:after{
    content:'',
    display:block
    height:0
    clear:both
    visibility:hidden
    }
    .clearfix{
    *zoom : 1
    }
    ```

    

- 5.双伪元素法

  - ```css
    .clearfix:before,
    .clearfix:after{
    content:''
    display:table
    }
    .clearfix:after{
    clear:both
    }
    .clearfix{
    *zoom:1
    }
    ```

    

### 8.外边距合并，外边距塌陷

- 两个块元素垂直排列给上加下margin，给下加上margin，会产生外边距合并，这时候会取最大的那个显示
- 嵌套块元素，给子元素设置上margin，父元素会跟着掉下来，这叫外边距塌陷
  - 解决方案：
    - 给父盒子设置上边框（不推荐）
    - 给父盒子设置 `overflow：hidden`  （推荐）
    - 加内边距，不用margin（推荐）

### 9.重排和重绘

- 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算。这被称为重排。注意这里至少会有一次重排-初始化页面布局。

- 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新。这样的更新被称为重绘。

- 什么时候会触发重排重绘
  - 添加、删除、更新 DOM 节点
  - display: none 隐藏一个 DOM 节点-触发重排和重绘
  - 通过 visibility: hidden 隐藏一个 DOM 节点-只触发重绘，因为没有几何变化
  - 移动或者给页面中的 DOM 节点添加动画
  - 添加一个样式表，调整样式属性
  - 用户行为，例如调整窗口大小，改变字号，或者滚动。

### 10.css 选择器有哪些?选择器的优先级?

- id选择器
- 类选择器
- 属性选择器
- 伪类选择器
- 标签选择器
- 伪元素选择器
- 通配符选择器
- 优先级：**内联样式 > ID选择器(100)> 类选择器(10) = 属性选择器 = 伪类选择器 > 元素选择器(1) = 关系选择器 = 伪元素选择器 > 通配符选择器(0)**

- !important
- 后代选择器选全部
- 子代选择器只选亲孩子