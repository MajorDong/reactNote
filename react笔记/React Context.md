# Context

>在组件树进行数据传递全局数据

## 何时使用Context

- 共享哪些对于一个组件树而言是全局的数据
- 使用Context，避免通过中间元素传递props

## 使用Context的注意

如果只是想要避免层层传递一些属性，组件组合是更好的方案

一种无需context的解决方案是将组件自身直接传递下去，而不是传递过多的props

>Context是将数据向组件树下的所有组件进行广播，所有组件都能访问到这些数据，也能访问到后续的数据更新

## API

### React.createContext

```js
const MyContext = React.createContext(defaultValue);
```

只有当所处的组件树中没有匹配搭配Provider时，defaultValue才会生效。

### Context.Provider

```js
<MyContext.Provider value={/* 某个值 */}>
```

- 多个Provider可以嵌套使用，里面的会覆盖外面的值
- 当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染

### Class.contextType

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;

//新语法
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

- 使用this.context来消费最近Context上的那个值
- 可以在任何生命周期中访问到它，包括render()中

### Context.Consumer

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

在函数式组件中完成订阅context

这个函数接收当前的content值，返回一个react节点

### Context.displayName

设置在DevTools中将显示的内容

##  动态Context

- 在Provider内部的组件，使用state中的值
- 外部的组件使用React.createContext时的默认值

## 在嵌套组件中更新Context

通过context传递一个函数，使得consumers组件更新context

## 消费多个Context

为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。



