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
          return wombat === action.wombat ? action.newWombat : wombat
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

function render () {
  const state = store.getState()
  const wombats = state.wombats
  document.getElementById('app').innerHTML = renderWombats(wombats)
  document.getElementById('wombat').addEventListener('click', deleteWombat)
  document.getElementById('but').addEventListener('click', addWombat)
}

function renderWombats (wombats) {
  let add = `<input type='text'id='add'> <input id='but' type='submit' value='Add Wombat'>`
  let edit = `<input type='text'id='edit'> <input id='butty' type='submit' value='Edit Wombat'>`
  let output = '<ul>'
  for (const wombat of wombats) {
    output += `<li>${wombat} <button id='wombat' name=${wombat}>Delete</li><br>`
  }
  output += '</ul>'
  return output + add
}

function addWombat () {
  store.dispatch({
    type: 'ADD_WOMBAT',
    wombat: document.getElementById('add').value
  })
}

function deleteWombat () {
  store.dispatch({
    type: 'DEL_WOMBAT',
    wombat: document.getElementById('wombat').name
  })
}

function updateWombat () {
  
}
