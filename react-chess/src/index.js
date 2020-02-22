import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

const Cell = function (props) {
  return (
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  )
}

const Chessboard = function () {
  const [cells, setCells] = React.useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [n, setN] = React.useState(0)
  const [finshed, setFinshed] = React.useState(false)
  //这里注意要把新的cells传递进来
  const judge = (cellsCopy) => {
    for (let i = 0; i < 3; i++) {
      if (cellsCopy[i][0] === cellsCopy[i][1] &&
        cellsCopy[i][1] === cellsCopy[i][2] &&
        cellsCopy[i][0] !== null
      ) {
        console.log(cellsCopy[i][0] + '获胜')
        setFinshed(true)
        break
      }
    }
    for (let i = 0; i < 3; i++) {
      if (cellsCopy[0][i] === cellsCopy[1][i] &&
        cellsCopy[1][i] === cellsCopy[2][i] &&
        cellsCopy[0][i] !== null
      ) {
        console.log(cellsCopy[0][i] + '获胜')
        setFinshed(true)
        break
      }
    }
    if (cellsCopy[0][0] === cellsCopy[1][1] && cellsCopy[1][1] === cellsCopy[2][2]
      && cellsCopy[0][0] !== null
    ) {
      console.log(cellsCopy[0][0] + '获胜')
      setFinshed(true)
    }
    if (cellsCopy[0][2] === cellsCopy[1][1] && cellsCopy[1][1] === cellsCopy[2][0]
      && cellsCopy[0][2] !== null
    ) {
      console.log(cellsCopy[0][2] + '获胜')
      setFinshed(true)
    }
  }
  const onClickCell = (row, col) => {
    //n+2
    setN(n + 1)
    //改变点击后的cells
    const cellsCopy = JSON.parse(JSON.stringify(cells))
    cellsCopy[row][col] = n % 2 === 0 ? 'x' : 'o'
    setCells(cellsCopy)
    //判断胜利的一方
    judge(cellsCopy)
  }
  //注意接受参数又不立即执行
  return (
    <div>
      <div>总步数: {n}</div>
      {cells.map((items, row) => <div className="row">
        {items.map((item, col) => <div className="cell">
          <Cell text={item} onClick={() => onClickCell(row, col)} />
        </div>)}
      </div>)}
      {finshed && <div className="gameOver">游戏结束</div>}
    </div>
  )
}

ReactDOM.render(<Chessboard />,
  document.getElementById('root'));

