export default {
  addWombat,
  delWombat,
  updateWombat
}

function delWombat (wombat) {
  return {
    type: 'DEL_WOMBAT',
    wombat: wombat
  }
}

function addWombat (wombat) {
  return {
    type: 'ADD_WOMBAT',
    wombat: wombat
  }
}

function updateWombat (oldName, newName) {
  return {
    type: 'UPDATE_WOMBAT',
    oldName: oldName,
    newName: newName
  }
}
