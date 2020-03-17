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



## 9.Vue实现路由跳转

- router-link
- router.go
- router.push



## 10.Vue-router跳转和location.href的区别

- vue-router是改变hash
- location.href是页面间跳转，刷新页面



## 11.对于MVVM的理解？

- MVVM 是Model - View - ViewModel 的缩写，一种软件开发的设计模式
- **Model** 代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑，泛指后端进行的各种业务逻辑处理和数据操控，主要围绕数据库系统展开。后端的处理通常会非常复杂
- **View** 视图层，它负责将数据模型转化成UI 展现出来。
- **ViewModel** 监听模型数据的改变和控制视图行为、处理用户交互、简单理解就是一个同步 View和Model的对象，连接Model和View。
- viewmodel层通过事件绑定，监听视图层的变化，然后传递给model做出更新，更新之后，model传回来的数据，viewmodel层又通过数据绑定，把数据响应到页面组件上
- 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，model 和 ViewModel 之间的交互是双向的，因此View 数据的变化会同步到Model 中，而Model数据的变化也会立即反应到View上。
-  **ViewModel** 通过双向数据绑定把View 层和model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由MVVM 来统一管理。

![image-20200314171803661](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200314171803661.png)



## 12.Vue的生命周期

- **beforeCreate( 创建前 )**
  - 在实例初始化之后，数据观测和事件配置之前被调用，此时组件的选项对象还未创建，el 和 data 并未初始化，因此无法访问methods， data， computed等上的方法和数据。

- **created ( 创建后 ）**
  - 实例已经创建完成之后被调用，在这一步，实例已完成以下配置：数据观测、属性和方法的运算，watch/event事件回调，完成了data 数据的初始化，el没有。 然而，挂在阶段还没有开始, $el属性目前不可见，这是一个常用的生命周期，因为你可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，，获取computed中的计算属性等等，通常我们可以在这里对实例进行预处理，也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的，因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个方法发请求，建议在组件路由钩子beforeRouteEnter中完成

- **beforeMount**
  - 挂在开始之前被调用，相关的render函数首次被调用（虚拟DOM），实例已完成以下的配置： 编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时还没有挂在html到页面上。

- **mounted**
  - 挂在完成，也就是模板中的HTML渲染到HTML页面中，此时一般可以做一些ajax操作，mounted只会执行一次。

- **beforeUpdate**
  - 在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步地更改状态，不会触发附加地重渲染过程

- **updated（更新后）**
  - 在由于数据更改导致地虚拟DOM重新渲染和打补丁只会调用，调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环，该钩子在服务器端渲染期间不被调用

- **beforeDestrioy （销毁前）**
  - 在实例销毁之前调用，实例仍然完全可用，
  - 这一步还可以用this来获取实例，
  - 一般在这一步做一些重置的操作，比如清除掉组件中的定时器  和 监听的dom事件

- **destroyed（销毁后）**
  - 在实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用



## 13.Vue 实现数据双向绑定的原理：Object.defineProperty()

- vue实现数据双向绑定主要是：采用 **数据劫持结合发布者-订阅者模式** 的方式，通过 **Object.defineProperty()** 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回掉。当把一个普通 JavaScript 对象传给Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用Object.defineProperty 将他们转为 getter/setter。用户看不到getter / setter ，但是在内部它们让vue追踪依赖，在属性被访问和修改时通知变化。

- vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Complie 和 Watcher三者，通过Observer来监听自己的model的数据变化，通过Complie来解析编译模板指令(vue中是用来解析 {{ }} ），最终利用watcher搭起observer和complie之间的通信桥梁，达到数据变化 ==》 视图更新，视图交互变化（input）==》 数据model变更双向绑定效果。
- JS实现：

```js
<body>
    <div id="app">
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
</body>
<script type="text/javascript">
    var obj = {};
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue;
            document.getElementById('show').innerHTML = newValue;
        }
    })
    document.addEventListener('keyup', function (ev) {
        obj.txt = ev.target.value;
    })
</script>
```



## 14.Vue 组件间的参数传递

- **1.父组件与子组件传值**
  - 父组件传给子组件： 子组件通过props方法接受数据；
  -  子组件传给父组件：$emit方法传递参数;
- **2.非父子组件间的数据传递，兄弟组件传值**
  - EventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接受事件，项目比较小时，用这个比较合适；
    - 观察者模式：你的组件需要根据别的组件的状态的改变而改变
    - EventBus的特点是每个组件都需要维护一份状态
    - 导出一个公共的Vue实例，所有人都在这个实例上监听触发事件,把没有关系的组件，通过公共实例串联起来，达到传值目的
    - 注意，$on() 应该在created中开启监听
    - eventBus.$on(‘事件’，() => { } )，监听事件，事件被触发后，执行回调函数
    - eventBus.$emit('事件'，...args )，触发事件
  - Vuex，创建一个数据仓库，整个项目全局都可以往这个仓库存放数据和读取数据 
    -  只需要维护一份状态
    -  众多组件需要同一份状态改变时，产生众多关联组件，可以考虑vuex



## 15.Vue的路由实现：hash模式 和 history模式

- **hash模式**： 在浏览器中符号 “#” 以及#后面的字符称之为hash，用window.location.hash读取；特点：hash虽然在URL中，但不被包括在HTTP请求中，用来指导浏览器动作，对服务端安全无用，hash不会重新加载页面。

- **history模式**：history 采用HTML5的新特性；且提供了两个新方法：pushState（）、replaceState（）可以对浏览器历史纪录栈进行修改，以及popState事件监听到状态变更。

  

## 16.Vue与Angular以及React的区别？



## 17.Vue路由的钩子函数

- 首页可以控制导航跳转，beforeEach，afterEach等。一般用于页面title的修改，一些需要登录才能调整页面重定向功能。
- **beforeEach** 主要的3个参数to，from，next；
- **to** : route即将进入的目标路由对象、
- **from**： route当前导航正要离开的路由、
- **next**： function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转



## 18.Vuex是什么？怎么使用？那种功能场景使用它？

- vuex是一个专为vue.js应用程序开发的状态管理模式（它采用集中式存贮管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化）。

- vuex五大核心属性：state，getter，mutation，action，module
  - state：存储数据，存储状态；在根实例中注册了store 后，用 `this.$store.state` 来访问；对应vue里面的data；存放数据方式为响应式，vue组件从store中读取数据，如数据发生变化，组件也会对应的更新。

  - getter：可以认为是 store 的计算属性，它的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

  - mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

  - action：包含任意异步操作，通过提交 mutation 间接更变状态。

  - module：将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

  - 当组件进行数据修改的时候我们需要调用dispatch来触发actions里面的方法。actions里面的每个方法中都会有一个commit方法，当方法执行的时候会通过commit来触发mutations里面的方法进行数据的修改。mutations里面的每个函数都会有一个state参数，这样就可以在mutations里面进行state的数据修改，当数据修改完毕后，会传导给页面。页面的数据也会发生改变。

    ![img](https://img2018.cnblogs.com/blog/1540475/201811/1540475-20181119173816634-2123321569.jpg)

- 存在众多的多层嵌套组件或兄弟组件需要共享状态或使用同一份状态时，同一份状态改变会影响众多组件，不同组件的事件需要改变同一状态。我们经常会采用父子组件直接引用(**父子组件传值**)或者通过事件来变更和同步状态的多份拷贝(**EventBus**)。以上的这些模式非常脆弱，通常会导致代码无法维护。所以我们需要把组件的共享状态抽取出来，以一个全局单例模式管理(**Vuex**)。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。



## 19.对Keep-Alive的了解？

- **keep-alive** 是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
- 在vue 2.1.0的版本之后，keep-alive新加入了两个属性： include( 包含的组件缓存）与exclude(排除的组件不缓存，优先级大于include）

```html
 <keep-alive include="inclde_components" exclude="exclude_components">
      <component>
        <!-- 该组件是否缓存取决与include 和 exclude 属性-->
      </component>
  </keep-alive>
```