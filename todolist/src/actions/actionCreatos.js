const changeInputAction = (e)=>({
  type: 'CHANGE_INPUT',
  value: e.target.value
})

 const addItemAction = () =>({
  type: 'ADD_ITEM'
})
 const deteleItemAction = (index) =>({
  type: 'DELETE_ITEM',
  index
})

export { changeInputAction, addItemAction, deteleItemAction }

