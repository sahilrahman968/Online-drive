import React from 'react'

function Fallback() {
  return (
    <div style={{position:"fixed", top:"0", bottom:"0" , right:"0", left:"0", display:"flex", alignItems:"center", justifyContent:"center", zIndex:"99", opacity:"0.6"}}>
        <h1 style={{textAlign:"center"}}>Loading...</h1>
    </div>
  )
}

export default Fallback