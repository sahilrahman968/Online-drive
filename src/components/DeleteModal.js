import React from 'react';
import { Button, Modal} from 'antd';

const DeleteModal = ({showModal, setShowModal, handleDeleteNode, parentId, id, isFolder}) => {
  const handleCancel = () => {
    setShowModal(false);
  };

  const onClickHandler = (flag) => {
    if(flag){
        handleDeleteNode(parentId,isFolder,id)
    }
    setShowModal(false)
  }

  return (
    <>
      <Modal open={showModal} onCancel={handleCancel} footer={null}>
        <div style={{textAlign:"center"}}>
          <h3 style={{fontWeight:"normal"}}>Are you sure, you want to delete this file/folder?</h3>
          <Button style={{marginRight:"10px"}} onClick={()=>onClickHandler(true)}>yes</Button>
          <Button onClick={()=>onClickHandler(false)}>no</Button>
        </div>
      </Modal>
    </>
  );
};
export default React.memo(DeleteModal);