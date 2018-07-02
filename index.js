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
  for (const wombat of wombats) {
    document.getElementById(wombat).addEventListener('click', deleteWombat.bind(null, wombat))
    document.getElementById(`edit${wombat}`).addEventListener('click', updateWombat.bind(null, wombat))
  }
  document.getElementById('addBut').addEventListener('click', addWombat)
}

function renderWombats (wombats) {
  let add = `<input type='text' id='add'> <input id='addBut' type='submit'>`
  let output = '<ul>'
  for (const wombat of wombats) {
    output += `<div><li>${wombat} 
    <button id=${wombat} name=${wombat}>Delete</button> 
    <input type='text' id=input${wombat}> <input id='edit${wombat}' type='submit'> 
    </li></div><br>`
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

function deleteWombat (wombat) {
  store.dispatch({
    type: 'DEL_WOMBAT',
    wombat: wombat
  })
}

function updateWombat (wombat) {
  store.dispatch({
    type: 'UPDATE_WOMBAT',
    wombat: wombat,
    newWombat: document.getElementById(`input${wombat}`).value
  })
}
