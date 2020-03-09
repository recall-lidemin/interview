// 其次
setTimeout(function(){
console.log('setTimeout');
},0)

// 最后
setImmediate(function(){
  console.log('setImmediate');
})

// 最先执行
process.nextTick(function(){
  console.log('process.nextTick');
})

// 借助libuv库实现

// 事件轮询机制,分为6个阶段
//  1.timers定时器阶段:计时和执行到点的定时器回调函数(执行了setTimeout)
//  2.pending callbacks:某些系统操作的回调函数
//  3.idle:准备工作
//  4.poll轮询阶段(轮询队列):
//    4.1如果轮询队列不为空:
//       依次同步取出队列中的第一个回调函数执行,直到轮询队列为空或者达到系统限制的最大值;
//    4.2如果轮询队列为空:
//       如果之前设置过setImmediate函数,直接进入下一个check阶段
//       如果之前没有设置setImmediate函数,在当前的poll阶段等待,直到轮询队列添加回调函数,就去第一个执行,如果定时器到点,也会去下一个阶段
//  5.check阶段
//    执行setImmediate函数(执行setImmediate)
//  6.close callbacks 关闭阶段
//    执行close事件回调函数

// process.nextTick 不管在任何阶段都优先执行