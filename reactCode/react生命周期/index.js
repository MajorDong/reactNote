import "./styles.css";

//create
let app = document.getElementById("app")
let div = document.createElement('div')
let state = 0

// UNSAFE_componentWillMount

//render == update
div.innerHTML = `
<div>
  <p id="number">${state}</p>
  <button id="plus">+1</button>
  <button id="die">die</button>
</div>
`
//mount
app.appendChild(div)

let number = document.getElementById("number")
let plus = document.getElementById('plus')
plus.onclick= () => {
  state += 1
  //update div == render
  number.innerText = state
}
let die = document.getElementById('die')
die.onclick  = () => {
  plus.onclick = null
  die.onclick = null
  div.remove()
  div = null // destroy div
}