import React from 'react'

function Wombats (props) {
  const wombats = props.wombats

funtion wombatAdder () {
  const addWombat = props.createWombat.bind(null, wombat)

}

  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat, i) => {
          const wombatRemover = props.rem.bind(null, wombat)
          return <li key={i}>{wombat}<button onClick = {wombatRemover}>Delete</button>  </li>
        })}

      </ul>
      <form>
        <input id='wom' type='text' ></input>
        <submit onClick = {wombatAdder}.>Add</submit>
      </form>
    </div>

  )
}

export default Wombats
