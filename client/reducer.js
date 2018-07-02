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
      const resulting = state.wombats.filter((wombat) => wombat !== action.newWombat)
      const ending = resulting.push(action.oldWombat)
      return {ending}
      

    default:
      return state
  }
}

export default wombatReducer
