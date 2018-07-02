import React from 'react'

import Wombats from './Wombats'

function App (props) {
  const wombats = props.wombats
  const rem = props.rem
  return (
    <div>
      <Wombats wombats={wombats} rem={rem} />
    </div>
  )
}

export default App
