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

function render () {
  const state = store.getState()
  const wombats = state.wombats
  document.getElementById('app').innerHTML = renderWombats(wombats)
}

function renderWombats (wombats) {
  let output = '<ul>'
  function del (wombat) {
    return {
      type: 'DEL_WOMBAT',
      wombat
    }
  }

  function delClick (wombat) {
    return store.dispatch(del(wombat))
  }
  
  for (const wombat of wombats) {
    output += `<li>${wombat}<button id=${wombat} onClick=delClick(${wombat})>Delete</li>`
  }
  output += '</ul>'
  return output
}
