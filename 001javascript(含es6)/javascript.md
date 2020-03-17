## 1.引起内存泄漏的操作

- 声明全局变量
- 产生闭包
- dom清除后但注册的事件未清除
- 有遗忘的定时器

## 2.ajax的实现

```
 var xhr = new XMLHttpRequest()
 xhr.open('type','url')
 xhr.send(body)
 xhr.onreadystatechange = function(){
 	if(xhr.readyState === 4){
 	if(xhr.status === 200){
 		var res = xhr.responseText
 	}
   }
 }
```

## 3.事件注册的性能问题
 - 事件委托解决
 - 及时移除事件

