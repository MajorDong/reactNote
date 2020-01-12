import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

const Cell = function (props) {
  return (
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  )
}

const Chessboard = function () {
  const [cells, setcells] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [n, setN] = React.useState(0)
  const judge = ()=>{
    console.log('谁获胜了')
  }
  const onClickCell = (row, col)=>{
    //n+2
    setN(n+1)
    //改变点击后的cells
    const cellsCopy = JSON.parse(JSON.stringify(cells))
    cellsCopy[row][col] = n % 2 === 0 ? 'x' : 'o'
    setcells(cellsCopy)
    //判断胜利的一方
    judge()
  } 
  //注意接受参数又不立即执行
  return (
    <div>
        <div>n: {n}</div>
      {cells.map((items,row) => <div className="row">
        {items.map((item,col) => <div className="cell">
          <Cell text={item} onClick={()=>onClickCell(row, col)}/>
        </div>)}
      </div>)}
    </div>
  )
}

ReactDOM.render(<Chessboard />,
  document.getElementById('root'));

