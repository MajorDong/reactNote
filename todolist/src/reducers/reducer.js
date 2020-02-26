

const defaultState = {
  inputValue: 'Write Something',
  list: [
    '早上4点起床，锻炼身体',
    '中午下班游泳一小时'
  ]
}

function reducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputValue: action.value
      }
    case 'ADD_ITEM':
      {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        return newState
      }
    case 'DELETE_ITEM':
      {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
      }
    default:
      return state
  }
}

export default reducer