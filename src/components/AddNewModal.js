import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import Toggle from './Toggle';

const AddNewModal = ({showModal, setShowModal, createHandler, items=[]}) => {
  const [selected , setSelected] = useState("File")  
  const [fileName , setFileName] = useState("")
  const [showWarning , setShowWarning] = useState(false)
  const inputRef = useRef()

  useEffect(()=>{
    inputRef.current.focus()
  },[selected])

  const handleCancel = () => {
    setShowModal(false);
  };

  const onClickHandler = () => {
    if(fileName?.length > 0){
    const isPresent = items?.find((item)=>{
      return item?.name.toUpperCase() === fileName.toUpperCase()
    }) ? true : false

    if(isPresent){
        setShowWarning(true)
    }
    else{
      createHandler(fileName, selected==="File"?false:true)
    }}
    else{
    setShowModal(false);}
  }

  return (
    <>
      <Modal open={showModal} onCancel={handleCancel} footer={null}>
        <div style={{textAlign:"center"}}>
          <h3 style={{fontWeight:"normal"}}>Create New</h3>
          <Toggle option1="File" option2="Folder" selected={selected} setSelected={setSelected}/>
          <Input onChange={(e)=>{{setFileName(e.target.value)} setShowWarning(false)}} ref={inputRef}/>
          {
            showWarning ? <span style={{color:'red'}}>File/Folder name already exists!</span> : null
          }
          <Button style={{marginTop:"20px", width:"100%", background:"rgba(75, 172, 255, 1)", color:"white" }} onClick={()=>onClickHandler()}>Create</Button>
        </div>
      </Modal>
    </>
  );
};
export default AddNewModal;