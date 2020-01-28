###组件&Props

1. 函数组件与class组件
2. 渲染组件
3. 组合组件
4. 提取组件
5. props的只读性

### State&生命周期

1. 将函数组件转换成class组件
2.  将函数组件转换成class组件
3. 向class组件中添加局部的state

4. 将生命周期方法添加到class中

   - componentDidMount()
   - componentWillUnmount(）

5. 正确使用State

   1. 不要直接修改State，不会重新渲染组件

   2. State的更新可能是异步的（当需要结合props更新state时）

      出于性能考虑，React可能会把多个setState调用合并成一个，导致this.props和this.state可能会异步更新，所以不能依赖他们的值来更新下一个状态。

      解决这个问题

      ```js
      // Correct
      //setState接收一个函数而不是一个对象
      //state第一个参数
      //此次被更新的时的props作为第二个参数
      this.setState((state, props) => ({
        counter: state.counter + props.increment
      }));
      // Wrong
      this.setState({
        counter: this.state.counter + this.props.increment,
      });
      ```

   3. State的更新会被合并,浅合并

6. 数据时向下流动的

### 事件处理

- 事件名小驼峰
- 传入一个函数作为事件处理函数，而不是一个字符串
- 注意this的绑定

#### 向事件处理程序传递参数

- 箭头函数
- Function.prototype.bind

React的事件对象e会被作为第二个参数传递

箭头函数必须显式传递

bind的方式，事件参数会被隐式传递

```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 条件渲染

1. 元素变量： 声明一个变量并使用if语句进行条件渲染
2. 与运算符&&：用{}。可以在jsx中嵌入任何表达式
3. 三元运算符
4. 阻止组件渲染，在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。（是否DOM已经加载？）

### 列表&Key

map(), 在React中，把数组转化为列表元素的过程是相似的

#### 渲染多个组件

使用{}在jsx内构件一个元素合集

```js
const numbers = [1,2,3,4,5]
const listItems = numbers.map((number)=>{
  <li>{number}</li>
})

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
)
```

#### 基础列表组件

#### Key

Key帮助React识别哪些元素改变了，比如被添加或删除。因此你应该给数组中的每一个元素赋予一个确定的标示。

1. 一个元素的key最好是这个列表中拥有的一个独一无二的字符串，通常使用数据中的id来作为元素的key
2. 万不得已可以使用索引index作为key

#### 用key提取组件

注意：key的正确使用，在map()方法中的元需要数着key属性

#### key只是在兄弟节点之间必须唯一

数组元素中使用的key在其兄弟节点之间应该是独一无二的。它们不需要是全局唯一的。当我们生成两个不同数组时，我们可以使用相同的key值

#### 在JSX中嵌入map()

### 表单

在React里，HTML表单元素的工作方式和其它的DOM元素有些不同，表单元素通常会保持一些内部的state

####  受控组件

表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

####  textarea标签

`<textarea>` 使用value属性代替

#### select标签

React并不会使用selected属性，而是在根select标签上使用value属性。这在受控组件中更便捷，只需要在根标签中更新它

- 多选

可以将数组传递到value属性中，以支持在select标签中选择多个选项

```html
<select multiple={true} value={['B', 'C']}>
```

#### 文件input标签

```html
<input type="file" />
```

在 HTML 中，`` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。

因为它的 value 只读，所以它是 React 中的一个**非受控**组件

#### 处理多个输入

当需要处理多个input元素时，我们可以给每个input元素添加name属性，并让处理函数根据event.target.name的值选择要执行的操作

使用对象计算属性名称的语法更新给定输入名称对应的state值

```javascript
this.setState({
  [name]: value
});
```

#### 受控输入空值

在受控组件上指定value的prop会阻止用户更改输入。如果你指定了value，但输入仍可编辑。

### 组合VS继承

使用组合而非继承来实现组件间的代码重用

#### 包含关系

- 类似vue的slot

有些组件无法提前知晓它们子组件的具体内容，这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这使得别的组件可以通过jsx嵌套，将任意组件作为子组件传递给它们

- 类似vue的具名slot

可以不使用children，而是执行约定，将所需内容传入props，并使用相应的prop

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

组件之类的React元素本质就是对象，所以可以把它们当作props，想其它数据一样传递

#### 特例关系

在React中，我们也可以通过组合来实现这一点，特殊组件可以通过prorps定制并渲染一般组件（像装饰着模式）











