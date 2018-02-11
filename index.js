import {createStore} from 'redux'

import reducer from './reducer'
import actions from './actions'

const store = createStore(reducer,
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
  const action = actions.delWombat(wombat)
  store.dispatch(action)
  e.preventDefault()
}

function addWombat (e) {
  const wombat = document.getElementById('newWombat').value
  const action = actions.addWombat(wombat)
  store.dispatch(action)
  e.preventDefault()
}

function updateWombat (wombat, e) {
  const oldName = wombat
  const newName = document.getElementById(`updated${wombat}`).value
  const action = actions.updateWombat(oldName, newName)
  store.dispatch(action)
  e.preventDefault()
}
