### 1.盒模型

- margin     padding   border   content

### 2.CSS3新特性

- border-radius圆角
- box-shadow阴影
- border-image边框图片
- linear-gradient 线性渐变
- text-shadow文字阴影
- radial-gradient 径向渐变
- 2D/3D transform：rotate  scale  translate
- @media媒体查询，根据屏幕宽度，设置
- flex布局

### 3.实现元素隐藏

- `display：none`
- `visibility:hidden`
- `opacity:0`
- `position:top:-9999px,left:-9999px`

### 4.实现元素水平居中垂直居中

- `text-align:center`行内元素
- `margin:0 auto;`  定宽块状元素
- `position:left:50% transform:translate(-50%)`
- 垂直居中：
  - 单行文本：`height = line-height`
  - `vertical-align:middle` 
  - `position:top:50% transform:translate(0,-50%)`

### 5.定位元素的水平垂直居中

- 宽高固定 ` position:absolute top:0,bottom:0,left:0,right:0 margin:auto`

- ` position:absolute top:50%,left:50% transform:translate(-50%,-50%)`

### 6.Position,Display

- 