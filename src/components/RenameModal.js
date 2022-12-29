import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Input } from 'antd';

const RenameModal = ({showModal, setShowModal, items, handleRenameNode, parentId, id, isFolder}) => {
  const [showWarning , setShowWarning] = useState(false)
  const [fileName , setFileName] = useState("")
  const inputRef = useRef()

  useEffect(()=>{
    inputRef.current.focus()
  },[])

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
            handleRenameNode(parentId , fileName , isFolder , id)
            setShowModal(false);
        }
    }
    else{
        setShowModal(false);
    }
  }

  return (
    <>
      <Modal open={showModal} onCancel={handleCancel} footer={null}>
        <div style={{textAlign:"center"}}>
          <h3 style={{fontWeight:"normal"}}>Rename</h3>
          <Input className={showWarning?"warning":""} onChange={(e)=>{{setFileName(e.target.value)} setShowWarning(false)}} ref={inputRef}/>
          {
            showWarning ? <span style={{color:'red'}}>File/Folder name already exists!</span> : null
          }
          <Button style={{marginTop:"20px", width:"100%", background:"rgba(75, 172, 255, 1)", color:"white" }} onClick={()=>onClickHandler()}>Rename</Button>
        </div>
      </Modal>
    </>
  );
};
export default React.memo(RenameModal);