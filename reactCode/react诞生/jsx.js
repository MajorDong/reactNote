let number = 0

render()

let add = ()=>{
  number += 1
  render()
}

let minus = ()=>{
  number -= 1
  render()
}



function render(){
  ReactDOM.render(
    <div className="parent">
      <span>{number}</span>
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
    </div>,
    document.querySelector('#root')
  )
}

//JSX的本质不过是语法糖
React.createElement(
  'div',
  {className:'parent'},
  React.createElement('span',{className: red},number),
  React.createElement('button',{onClick:onClickButton},'+'),
  React.createElement('button',{onClick:onClickButton2},'-'),
) 