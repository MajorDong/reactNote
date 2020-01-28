# React生命周期

![react生命周期.png](http://ww1.sinaimg.cn/large/aee5767dgy1gbc9r4la9bj21mg0zewj2.jpg)



### 普通DOM操作

```javascript
import "./styles.css";

//create
let app = document.getElementById("app")
let div = document.createElement('div')
let state = 0

// UNSAFE_componentWillMount

//render == update
div.innerHTML = `
<div>
  <p id="number">${state}</p>
  <button id="plus">+1</button>
  <button id="die">die</button>
</div>
`
//mount
app.appendChild(div)

let number = document.getElementById("number")
let plus = document.getElementById('plus')
plus.onclick= () => {
  state += 1
  //update div == render
  number.innerText = state
}
let die = document.getElementById('die')
die.onclick  = () => {
  plus.onclick = null
  die.onclick = null
  div.remove()
  div = null // destroy div
}
```



## 生命周期使用场景

### constructor

1. 用于初始化内部状态
2. 唯一可以直接修改state的地方

### getDerivedStateFromProps

1. 当state需要从props初始化时使用
2. 尽量不要使用：维护两者状态一致性会增加复杂度
3. 每次render都会调用
4. 典型场景：表单控件获取默认值

### componentDidMount

1. UI渲染完成后调用
2. 只执行一次
3. 典型场景：获取外部资源、数据

### componentWillUnmount

1. 组件移除时被调用
2. 典型场景：资源释放

### getSnapshotBeforeUpdate

1. 在页面render之前调用，state已更新
2. 典型场景：获取render之前的DOM状态

### componentDidUpdate

1. 每次UI更新时被调用
2. 典型场景：页面需要根据props变化重新获取数据

### shouldComponentUpdate（手动判断更新）

1. 决定Virtual DOM是否要重绘
2. 一般可以由PureComponent自动实现
3. 典型场景：性能优化





## 常用常考

1. 请求数据 ajax  constructor onClick 任何步骤都可以 componentDidmount()
2. 更新数据  onClick  componentDidmount()只会挂载一次
3. 事件监听
4. 初始化state constructor 

###  常考

1. shouldComponentUpdate(){ return false; } 阻止更新，允许我们手动的判断是否要进行组件的更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。性能优化

2. 在生命周期的哪一步你应该发起AJAX请求

   componentDidMount（）