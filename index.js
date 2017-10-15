import { createStore } from 'redux'

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
          return wombat === action.oldName ? action.newName : wombat
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
  document.getElementById('addButton').addEventListener('click', addWombat)
  wombats.forEach(wombat => {
    document.getElementById(`delete${wombat}`)
      .addEventListener('click', delWombat.bind(null, wombat))
    document.getElementById(`update${wombat}`)
      .addEventListener('click', updateWombat.bind(null, wombat))
  })
}

function renderWombats (wombats) {
  let output = '<ul>'
  for (const wombat of wombats) {
    output += `
      <li>
        <span>${wombat}</span>
        <a href="#" id="delete${wombat}">x</a>
        <input id="updated${wombat}" value="${wombat}"><button id="update${wombat}">Update</button>
      </li>`
  }
  output += '</ul>'
  output += '<input id="newWombat"><button id="addButton">Add</buton>'
  return output
}

function delWombat (wombat, e) {
  const action = {
    type: 'DEL_WOMBAT',
    wombat: wombat
  }
  store.dispatch(action)
  e.preventDefault()
}

function addWombat (e) {
  const action = {
    type: 'ADD_WOMBAT',
    wombat: document.getElementById('newWombat').value
  }
  store.dispatch(action)
  e.preventDefault()
}

function updateWombat (wombat, e) {
  const action = {
    type: 'UPDATE_WOMBAT',
    oldName: wombat,
    newName: document.getElementById(`updated${wombat}`).value
  }
  store.dispatch(action)
  e.preventDefault()
}

