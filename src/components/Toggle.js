import React from 'react'

function Toggle({option1 , option2, selected , setSelected}) {

  const clickHandler = (e) => {
    if(e.target.innerText === option1){
       setSelected(option1)
    }
    else{
        setSelected(option2)
    }
  } 

  return (
    <div onClick={(e)=>{clickHandler(e)}} style={{display:"flex", justifyContent:"center", marginBottom:"20px", cursor:"pointer"}}>
       <div style={{borderRadius:"4px", border:"1px solid #d5d5d5", display:"flex", overflow:"hidden"}}>
            <div style={{width:"50px",padding:"0px 5px 0px 5px", backgroundColor:selected===option1?"rgba(75, 172, 255, 1)":"",color:selected===option1?"white":""}}>{option1}</div>
            <div style={{width:"50px",padding:"0px 5px 0px 5px", backgroundColor:selected===option2?"rgba(75, 172, 255, 1)":"", color:selected===option2?"white":""}}>{option2}</div>
       </div>
    </div>
  )
}

export default React.memo(Toggle)