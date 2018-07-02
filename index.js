import {createStore} from 'redux'

const initialWombatState = {
  wombats: ['Gertrude', 'Bartholemew']
}

const wombatReducer = (state = initialWombatState, action) => {
  switch (action.type) {
    case 'ADD_WOMBAT':
      return {
        wombats: [...state.wombats, action.wombat]
      }
    case 'DEL_WOMBAT':
      return {
        wombats: state.wombats.filter((wombat) => wombat !== action.wombat)
      }
    case 'UPDATE_WOMBAT':
      return {
        wombats: state.wombats.map((wombat) => {
          return (wombat == action.wombat ? action.newName : wombat)
        })
      }
    default:
      return state
  }
}

const store = createStore(wombatReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

document.addEventListener('DOMContentLoaded', () => {
  render()
  store.subscribe(render)
})

function delWom () {
  store.dispatch({
    type: 'DEL_WOMBAT',
    wombat: document.getElementById('wombat').name
  })
}

function addWom () {
  store.dispatch({
    type: 'ADD_WOMBAT',
    wombat: document.getElementById('womName').value
  })
}

function render () {
  const state = store.getState()
  const wombats = state.wombats
  document.getElementById('app').innerHTML = renderWombats(wombats)
  document.getElementById('wombat').addEventListener('click', delWom)
  document.getElementById('addWom').addEventListener('click', addWom)
}

function renderWombats (wombats) {
  let output = '<ul>'
  for (const wombat of wombats) {
    output += `<li>${wombat}<button id="wombat" name=${wombat}>Delete</li>`
  }
  output += '</ul> <br> <input type="text" id="womName"> <button id="addWom"> Add'
  return output
}

// function renderAdd () {
//   const output = '<input type="text" id="womName"> <button id="addWom"> Add'
//   return output
// }
