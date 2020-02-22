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



