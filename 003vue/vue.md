# Vue

## 1.$emit  &  props

### 1.1.$emit

- 语法：`$emit( eventName, […args] )`

  - **eventName** :这是一个自定义或系统 **事件名** (系统定义click等,或自定义)
  - **…args** ：参数列表，会被抛出，传递给触发的该事件所绑定的函数使用
- 使用场景：子父传值，多用来从子组件触发父组件定义的事件，以把子组件的值回调给父组件事件所绑定的方法使用，达到子组件传值给父组件的目标

### 1.2.props

- 组件传值：
  - 父传子，通过属性绑定传值 `  :自定义属性名="变量"`
  - 子组件通过**props** 接收 ` props:['父组件的自定义属性名',[..args]]` 

### 1.3实例

```js
<!-- 组件的使用 -->

<div id="app">
        <div class="foods">
            <list-item v-for="(item,index) in list" @getitem="getitem" :item="item"                     :key="item.id"></list-item>
        </div>
</div>
<script>
    Vue.component('list-item', {
        template: `
        <div class="list-item">
        <div class="img">
            <img :src="item.img" alt="">
        </div>
        <div class="info">
            <span class="title">{{item.title}}</span>
            <add-cut :count='item.count' @getcount='getcount'></add-cut>
        </div>
        </div>`,
        methods: {
            getcount(count) {
                this.$emit('getitem', {
                    ...this.item,
                    count
                })
            }
        },
        props: ['item'],
        components: {
            "add-cut": {
                template: `
                <div class="addcut">
                     <span @click='cut' class="addcut-span" v-if="count">-</span>
                     <span class="count" v-if="count">{{ count }}</span>
                     <span @click='add' class="addcut-span">+</span>
                </div>`,
                props: ['count'],
                methods: {
                    cut() {
                        this.$emit('getcount', this.count - 1)
                    },
                    add() {
                        this.$emit('getcount', this.count + 1)
                    }
                }
            }
        }
    })

    let vm = new Vue({
        el: '#app',
        data: {
            list: [{
                    id: 1,
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582385941145&di=c4ebf24db1509ebe93adca0c137c1938&imgtype=0&src=http%3A%2F%2Fimg.improve-yourmemory.com%2Fpic%2F72071791ca96de6e8983c1310190e0fa-2.jpg',
                    title: '龙虾拌芥末',
                    count: 0
                },
                {
                    id: 2,
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582385941144&di=83385bf0b2c64ccde9981467098b2d52&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F18%2F210259bqy79b8e7zfykqzk.jpg',
                    title: '杭州烧麦',
                    count: 0
                },
                {
                    id: 3,
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582385941144&di=f29fcba50a3784a7dc8fbe182825f3fb&imgtype=0&src=http%3A%2F%2Fhuafans.dbankcloud.com%2Fpic%2F2015%2F07%2F22%2F3c9982588d15d72a027ac18876113b31_10857385%2C5120%2C2880.jpg%3Fmode%3Ddownload',
                    title: '培根煎蛋',
                    count: 0
                }
            ]
        },
        methods: {
            getitem(item) {
                this.list = this.list.map(foods => {
                    if (item.id == foods.id) {
                        return item
                    }
                    return foods
                })
            }
        }
    });
```



##  2.watch

- 作用：监听属性数据的改变
- 语法：` watch:{ listenAttribute : function ( newValue , oldValue )}` 
  - 参数1：需要监听的属性名
  - 参数2：是一个function，function有两个形参，第一个代表改变后的新的数据，第二个代表改变以前的旧数据
- 实例：

```js
         new Vue({
            el: '#app',
            data: {
                list: [],
                name: '',
                search: '',
                obj:{
                    
                }
            },
            // 监听数据的变化，监听谁就在里面写谁，提供一个函数，
            // 函数的两个参数是： newValue(改变后的新数据)，oldValue(改变前的旧数据)
            watch: {
                // 这里不能用箭头函数，否则会改变this指向，变成window
                //被监听的是data里的search属性，他的值变化就是触发监听
                search: function (newValue, oldValue) {
                    // 这里的this指向Vue实例
                    axios.get(`http://localhost:3000/company?name_like=${newValue}`)
                        .then(res => {
                            // 使用箭头函数，指向外部Vue实例
                            this.list = res.data
                        })
                },
                obj:{
                    deep:true // 开启深监听
                    handler(){
                		// 只要数据改变就会自动触发该函数
                    }
                }
            })
```



## 3.less中 & 的使用

- 可以去除层级之间的空格，让原来的嵌套关系，变成平级关系
- `.login{ .span{ } }` ===>编译成CSS `.login  .span`       选中.login下的全部 .span

- `.login{ &.span{ } }`===>编译成CSS `.login.span`    选中.login下并且是 .span元素



## 4.axios拦截器

- 配置拦截器

 ```js
 //请求拦截
axios.interceptors.request.use(config => {
  
   config.headers.Authorization = window.sessionStorage.getItem('token')
  
   return config
  
  })

//响应拦截
axios.interceptors.response.use(config => {
  
  //处理返回数据
  
   return config
  
  })
  
 ```



## 5.前端大数字问题

- 问题：
  - 后台返回超长的数字，出现了前端js的精度问题，涉及到number的安全整数
  - JavaScript计算数字的时候，有一个安全范围，如果超出了，就会失真，Number的最大数字：Number.MAX_SAFE_INTEGER
  - 后端(字符串)==>JSON.parse()==>前端(对象)：当数字很大，超出安全整数时，JSON.parse()计算就会失真

- 解决方案：利用第三方包 json-bigint 处理大数字 `JSONBig.parse()`

- 处理时机：

  - 重写该属性 `transformResponse` 该属性在axios响应拦截器执行之前触发

    ```js
        axios.defaults.transformResponse = [function(data) {
            
          // 需要判断data是否为空，不为空转化返回，为空直接返回空对象，不然会报错
    
          return data ? JSONBig.parse(data) : { }
            
        }]
    ```



## 6.路由导航守卫

- 注册，监听路由跳转

```js
    // 注册路由导航守卫
    router.beforeEach((to, from, next) => {
        // to 要去往哪里
        // from 从哪里来
        // 放行函数，必须执行
      if (to.path === '/login') return next()
      const token = window.sessionStorage.getItem('token')
      if (!token) return next('/login')
      next()
    })
```

## 7.组件化与模块化区别

 - 组件化是基于UI界面划分的,方便UI组件的复用
 - 模块化是基于代码逻辑划分的,方便代码分层开发,保证每个功能模块职能单一

## 8.组件

 - 一切重复的结构数据逻辑都可以封装成一个组件
 - 每一个组件实例都是独立的
 - 组件就是一个特殊的Vue实例
 - 组件中包含了：data(方法，返回一个对象)/methods/filters/directives/computed/components/生命周期函数

## 9.处理非关系型组件间传值

- eventBus
  - 导出一个公共的Vue实例，所有人都在这个实例上监听触发事件,把没有关系的组件，通过公共实例串联起来，达到传值目的
  - 注意，$on() 应该在created中开启监听
  - eventBus.$on(‘事件’，() => { } )，监听事件，事件被触发后，执行回调函数
  - eventBus.$emit('事件'，...args )，触发事件
- vuex

## 10.Vue数据双向绑定的原理及其实现

- 通过 Object.defineProperty 实现的

## 11.Vue实现路由跳转

- router-link
- router.go
- router.push

## 12.Vue-router跳转和location.href的区别

- vue-router是改变hash
- location.href是页面间跳转，刷新页面