import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component{
  handleClick() {
    console.log('用户点击了')
    this.setState({
      n: this.state.n + 1
    })
  }
  constructor(){
    super()
    this.state = {
      n: 0
    }
    this.handleClick = this.handleClick.bind(this)
    console.log("创建App")
  }
  UNSAFE_componentWillMount(){ //17版本推荐在constructor
    console.log("将要mountApp")
  }
  render(){ // render update
    console.log("填充||更新 App的内容")
    return (
      <div>
        {this.state.n}
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
  componentDidMount(){
    console.log('mountApp完毕')
  }

  UNSAFE_componentWillUpdate(){//17版本getSnapshotBeforeUpdate
    console.log('update App之前')
  }
  componentDidUpdate(){
    console.log('update App之后')
  }

  componentWillUnmount(){
    console.log('App将要摧毁')
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
