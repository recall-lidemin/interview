## 1.webpack优点

 - 模块化
 - 代码拆分
 - Loader
   - webpack本身只能处理Javascript
   - 转换器，把各类资源转化成Javascript模块
 - 智能解析
 - 插件系统(Plugins)
 - Loader和plugins(插件系统)有什么区别：plugins对整个构建起作用，loader只对某些资源文件起作用(less,css,png)，一次只处理一个，插件并不直接操作单个文件，是直接对整个构建起作用

## 2.Webpack工作方式

 - 把项目当作一个整体，通过一个给定的主文件(index.js)，Webpack将从这个文件开始找到你的项目所依赖的文件，使用loader处理他们，最后打包成一个或多个JS文件，这个过程主要依赖Webpack的智能解析系统

## 3.打包处理图片文件

- file-loader解决方案，实际是把图片拷贝到了输出文件下，并且改了名字
- url-loader解决方案，把文件转换成base64字符串，不会生成任何实质性的文件
  - 此种方案可以省去一次请求，但如果图片过大，也会导致app.js过大
  - 增加 option 配置参数，增加 limit 属性，阈值
  - `use[{ loader:'url-loader', option:{ limit:8192，outputPath:images }}]`
  - outputPath 设置物理文件的拷贝路径，根目录是输出文件目录，这里设置的文件会生成在输出目录下
  - limit设置一个阈值，小于该值会使用 url-loader 将图片转为base64；如果大于阈值，会自动去调用 file-loader 拷贝文件
- 所以综合以上二者应该配合取一个平衡最优点，小于阈值的使用url-loader，大于阈值的使用 file-loader