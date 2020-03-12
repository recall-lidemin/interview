## webpack优点
 - 模块化
 - 代码拆分
 - Loader
   - webpack本身只能处理Javascript
   - 转换器，把各类资源转化成Javascript模块
 - 智能解析
 - 插件系统(Plugins)
 - Loader和plugins(插件系统)有什么区别：plugins对整个构建起作用，loader只对某些资源文件起作用(less,css,png)，一次只处理一个，插件并不直接操作单个文件，是直接对整个构建起作用

 ## Webpack工作方式
 - 把项目当作一个整体，通过一个给定的主文件(index.js)，Webpack将从这个文件开始找到你的项目所依赖的文件，使用loader处理他们，最后打包成一个或多个JS文件，这个过程主要依赖Webpack的智能解析系统
 