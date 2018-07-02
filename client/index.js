import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import App from './components/App'
import wombatReducer from './reducer'

const store = createStore(wombatReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

document.addEventListener('DOMContentLoaded', () => {
  render()
  store.subscribe(render)
})

function wombatdeleter (wombat) {
  return {
    type: 'DEL_WOMBAT',
    wombat: wombat
  }
}

function createWombat (wombat) {
  return {
    type: 'ADD_WOMBAT',
    wombat: wombat
  }
}

function sendToStore (wombat) {
  const action = createWombat(wombat)
  store.dispatch(action)
}

function wombatRemover (wombat) {
  const action = wombatdeleter(wombat)
  store.dispatch(action)
}

function render () {
  const state = store.getState()
  const wombats = state.wombats
  ReactDOM.render(
    <App wombats={wombats} rem={wombatRemover} />,
    document.getElementById('app')
  )
}
