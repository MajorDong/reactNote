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
  return { count: state.n } //这里考虑性能问题，将能访问的节点限制到最小的范围
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({add1, add2, minus, oddAdd, delay2s},dispatch)
    // add1: () =>{dispatch({type:'ADD',payload:1 })},
    // add2: () => {dispatch({type:'ADD', payload: 2 })},
    // minus: () =>{dispatch({type:'MINUS'})}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
