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
  document.getElementById('app').innerHTML = renderWombats(state.wombats)
  // for every wombat in state i'm going to get document by X
  for (let index in wombats) {
    document.getElementById(wombats[index]).addEventListener('click', function () {
      store.dispatch({
        type: 'DEL_WOMBAT',
        wombat: wombats[index]})
    })
  }
  document.getElementById('add').addEventListener('click', function () {
    const newWombat = document.getElementById('addWombat').value
    store.dispatch({
      type: 'ADD_WOMBAT',
      wombat: newWombat
    })
  })
}

function renderWombats (wombats) {
  let output = '<ul>'
  for (const wombat of wombats) {
    output += `<li>${wombat}</li><input type='submit' value='delete' id=${wombat}>`
  }
  output += '</ul>'

  output += '<input type="text" id="addWombat" placeholder="add your Wombat" /> '
  output += '<input type="submit" value="Add" id="add" />'
  return output
}
