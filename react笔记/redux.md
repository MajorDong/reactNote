# Redux

![redux.png](http://ww1.sinaimg.cn/large/aee5767dgy1gbg0rza1x2j20ob0mowhc.jpg)

## 关于redux

### redux特征

1. Single Source of Truth
2. (State + action) => newstate 可预测性
3. 纯函数更新Store

- state一个数据对象
- action一个描述变更state的对象
- reducer函数，数学理解为约归，这个函数的作用就是(State + action) => newstate 

state发生任何变化一定是由一个action引起的，如果发现state出了问题，一定可以发现对应的action是什么，很容易去定位问题

### 理解Store

通过发布订阅模式进行数据管理，通过getState()获取state。

- 通过dispatch(action) + oldState使用reducer函数返回newState
- listener（通常是render()函数）订阅state的变化，发现变化后执行listener（重新render页面）

1. getState() 
2. dispatch(action) 
3. subscribe(listener)

###combinReducers

 如果有多个reducer函数，将它们返回的state合并后放在在一个store里，有自己的节点，使用方法见下例

### bindActionCreators

Action Creator函数生成action，该方法将生成的action和`store.dispacth`方法装饰为新的函数，使用见下例

### 一个简单例子

一个简单的例子，在原生JavaScript中使用redux，来更好的理解redux

```javascript
//在createStore时会dispach一次初始化store
  
  //reducer1
  function stateChange(state, action){
    if( state === undefined){
      return 0
    }
    switch(action.type){
      case 'ADD':
        return state + action.payload
      case 'MINUS':
        return state - 1
      default:
        return state
    }
  }
  //reducer2
  const todos = (state = {}) => state
  
  //Creat store
  const store = Redux.createStore(
    //combinReducers的用法，生成两个节点
    Redux.combineReducers({ 
      stateChange,
      todos
    })
  )

  function add1(){
    store.dispatch({type: 'ADD', payload:1 })
  }

  //ActionCreator 结合bindActionCreators的用法
	//add2 和 add1 是一样的效果
  function add2(){
    return {type: 'ADD',payload: 2}
  }
 add2 = Redux.bindActionCreators(add2, store.dispatch)


  function minus1(){
    store.dispatch({ type: 'MINUS'})
  }
  function addIfOdd(){
    if(store.getState() % 2 !== 0){
      store.dispatch({type: 'ADD', payload: 1})
    }
  }
  function delay2sAdd(){
    setTimeout(()=>{
      store.dispatch({type:'ADD', payload: 1})
    },2000)
  }
  
  function render(store){
  let app = document.querySelector('#app')
  app.innerHTML = `
    <div>
      <div>Clicked:${store.getState().stateChange}<div>
      <div>
        <button id="add1" onclick="add1()">+1</button>
        <button id="add2" onclick="add2()">+2</button>
        <button id="minus1" onclick="minus1()">-1</button>
        <button onclick="addIfOdd()">如果是单数就+1</button>
        <button onclick="delay2sAdd()">延迟两秒后+1</button>
      </div>
    </div>
  `
}

render(store)//render页面

store.subscribe(()=>{
  render(store) //listener函数订阅state变化，重新渲染页面
})
```



## react-redux

如果我们像在原生JavaScript里使用redux，就需要在根组件将state和触发action的函数通过props一层一层的传递下去，这样使用状态管理显然不方便，所以诞生了react-redux

常用API

- Provider()
- connect()
  - mapStateToProps()
  - mapDispatchToProps()

一般流程

1. 创建reducer
2. 合并reducers
3. createStore
4. Provider 
5. connect(mapStatetoProps, mapDispatchToProps)(App)

####  例子

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';import App from './App';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

const initialState = { n: 0}
function reducer(state = initialState, action){
  switch(action.type){
    case 'ADD':
      return {n: state.n + action.payload}
    case 'MINUS':
      return {n:state.n - 1}
    default:
      return state
  }
}
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
// const render = () =>{
//   ReactDOM.render(<App 
//     value={store.getState()}
//     onAdd1={()=>{store.dispatch({type: 'ADD', payload: 1 })}}
//   />, document.getElementById('root'));
// }

// render()
// store.subscribe(()=>{
//   render()
// })

```

App.js

```js
import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'


function App(props) {
  return (
    <div>
      <div>Clicked:<span>{props.count}</span></div>
      <div>
        <button onClick={props.add1}>+1</button>
        <button onClick={props.add2}>+2</button>
        <button onClick={props.minus}>-1</button>
      </div>
    </div>
  );
}

function add1(){
  return {type: 'ADD',payload: 1}
}
function add2(){
  return {type: 'ADD', payload: 2}
}
function minus(){
  return {type: 'MINUS'}
}

const mapStateToProps = (state) => {
  return { count: state.n } //这里考虑性能问题，将能访问的节点限制到最小的范围
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({add1, add2, minus},dispatch)
    // add1: () =>{dispatch({type:'ADD',payload:1 })},
    // add2: () => {dispatch({type:'ADD', payload: 2 })},
    // minus: () =>{dispatch({type:'MINUS'})}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

```



### 异步Action & middleware

![异步action.png](http://ww1.sinaimg.cn/large/aee5767dgy1gbh5b5bd6aj20rx0pfgql.jpg)

我们在使用connect调用Action creator函数的时候，同步的action会被自动添加上dispatch，异步的action被当作返回一个undefined。 

如何解决：

异步actionCreator => middleware处理生成新的action => 手动dispatch => reducer

#### redux-thunk

middleware包装了store的dispatch()方法，可以让我们dispatch一些除了action以外的其他内容，例如函数或者Promise对象。

1. 这时要让actionCreator返回一个方法，该方法的参数是dispatch，该方法里可以进行一些异步的操作或条件判断后，最后的回调函数手动的dispatch一个普通同步的action。
2. middleware将判断actionCreator返回的是一个函数还是一个action

#### 例子

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';import App from './App';
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


const initialState = { n: 0}
function reducer(state = initialState, action){
  
  switch(action.type){
    case 'ADD':
      return {n: state.n + action.payload}
    case 'MINUS':
      return {n:state.n - 1}
    default:
      return state
  }
}
export  const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
```

App.js

```js
import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { store } from './index'


function App(props) {

  return (
    <div>
      <div>Clicked:<span>{props.count}</span></div>
      <div>
        <button onClick={props.add1}>+1</button>
        <button onClick={props.add2}>+2</button>
        <button onClick={props.minus}>-1</button>
        <button onClick={props.oddAdd}>如果是单数就+1</button>
        <button onClick={props.delay2s}>延迟两秒后+1</button>
      </div>
    </div>
  );
}


function add1(){
  return {type: 'ADD',payload: 1}
}
function add2(){
  return {type: 'ADD', payload: 2}
}
function minus(){
  return {type: 'MINUS'}
}
//使用redux-thunk
function oddAdd(){
  return (dispatch) => {
    if(store.getState().n % 2 ===1 ){
      dispatch(add1())
    }
  }
}
//异步action，使用redux-thunk
function delay2s(){
  return (dispatch) => {
    setTimeout(()=> {
      dispatch(add1())
    },2000)
  }
}

const mapStateToProps = (state) => {
  return { count: state.n } 
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({add1, add2, minus, oddAdd, delay2s},dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
```







