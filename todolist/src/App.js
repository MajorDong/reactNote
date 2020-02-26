import React from 'react';
import {Button, List, Input} from 'antd'
import { changeInputAction, addItemAction, deteleItemAction  } from './actions/actionCreatos'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() { 
    return ( 
      <div className="App">
      <div>
      <Input
        placeholder={this.props.inputValue}
        style={{width: '270px', marginRight: '10px'}}
        onChange ={this.props.changeInputAction}
      ></Input>
      <Button 
        type="primary"
        onClick={this.props.addItemAction}
      >增加</Button>
      </div>
      <div>
        <List
          style={{width: '270px'}}
          bordered
          dataSource={this.props.list}
          renderItem = { (item,index) => (
            <List.Item 
            onClick={()=>{this.props.deteleItemAction(index)}}>
              {item}
            </List.Item>
          )}
        >
        </List>
      </div>
    </div>
     );
  }
}


const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({changeInputAction, addItemAction, deteleItemAction}, dispatch) 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App)
