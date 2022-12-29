import React, { useState } from 'react'
import addNew from "../assets/add_new_button.png"
import folder from "../assets/folder.png"
import emptyfolder from "../assets/emptyfolder.png"
import file from "../assets/file.png"
import Back from "../assets/arrow_up.png"
import Fallback from './Fallback'

const RenameModal = React.lazy(()=>import('./RenameModal'))
const DeleteModal = React.lazy(()=>import('./DeleteModal'))
const AddNewModal = React.lazy(()=>import('./AddNewModal'))

function Dashboard({currentTree , getChildTree, handleInsertNode, handleRenameNode, breadcrumb, setBreadCrumb, handleDeleteNode}) {
  const [showModal , setShowModal] = useState(false)
  const [showDeleteModal , setShowDeleteModal] = useState(false)
  const [showRenameModal , setShowRenameModal] = useState(false)
  const [active , setActive] = useState(null)
  const [idToDelete , setIdToDelete] = useState(null)

  const openFolder = (item) => {
    if(item?.isFolder){
        getChildTree(item?.id)
        let breadcrumbClone = [...breadcrumb]
        breadcrumbClone.push({name:item?.name ,id: item?.id})
        setBreadCrumb([...breadcrumbClone])
    }
  }

  const addFileOrFolder = (name , isFolder) => {
    handleInsertNode(currentTree.id, name, isFolder?true:false);
    setShowModal(false)
  }

  const breadcrumbHandler = (item) => {
    let breadcrumbClone = [...breadcrumb]
    const index = breadcrumbClone?.findIndex((crumb)=>{
        return crumb?.id === item?.id
    })
    breadcrumbClone.splice(index+1,breadcrumbClone?.length-index)
    setBreadCrumb([...breadcrumbClone])
    getChildTree(item?.id)
  }

  const backHandler = () => {
    let breadcrumbClone = [...breadcrumb]
    breadcrumbClone.splice(breadcrumbClone?.length-1,1)
    setBreadCrumb([...breadcrumbClone])
    getChildTree(breadcrumbClone?.[breadcrumbClone?.length-1]?.id)
  }

  return (
    <div>
        <div className='breadcrumb-wrapper' style={{margin:"10px 20px " , paddingBottom:"10px", display:"flex", alignItems:"center", borderBottom:"1px solid #d5d5d5"}}>
            {breadcrumb?.length>1?<img src={Back} alt="back" style={{transform:"rotate(-90deg)", marginRight:"10px", cursor:"pointer"}} onClick={()=>{backHandler()}}/>:""}
            {
                breadcrumb?.map((item,index)=>{
                    return <span key={item?.id} style={{color:index !== breadcrumb.length-1?"grey":"black",margin:"0px 1px", cursor:index !== breadcrumb.length-1?"pointer":""}} onClick={()=>{breadcrumbHandler(item)}}>{item?.name+" "}{index !== breadcrumb.length-1?"/":""}</span>
                })
            }
        </div>
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {
                currentTree?.items?.map((item,index)=>{
                    return <div key={item?.id} style={{margin:"20px"}}>
                                <div tabIndex={index} onDoubleClick={(e)=>{e.stopPropagation();openFolder(item);setActive(null)}} onClick={()=>{setActive(index)}} onBlur={()=>{setActive(null)}} style={{cursor:"pointer", position:"relative"}}>
                                    <div style={{backgroundColor:index === active ? "rgba(64, 150,255,.2)":"", padding:"15px" , borderRadius:"4px", textAlign:"center", display:"flex",alignItems:"center", justifyContent:"space-between", flexDirection:"column", minHeight:"80px"}}>
                                        <img style={{width:"50px", height:item.isFolder?"40px":"50px"}} src={item.isFolder?folder:file} alt="file or folder"/>
                                        <div style={{wordBreak:"break-all",minWidth:"70px",maxWidth:"130px", color:"gray"}}>{item?.name}</div>
                                    </div>
                                    {
                                        index === active ? 
                                        <div style={{borderRadius:"4px", boxShadow:"2px 2px 4px #000", position:"absolute", left:"90%", top:"90%", zIndex:"9", backgroundColor:"white"}}>
                                            <div style={{fontSize:"10px", padding:"10px", fontFamily:"sans-serif"}}>Created at: {new Date(item?.id+19800000).toUTCString().split("GMT")?.[0]}</div>
                                            <div className='hover' onClick={()=>{setActive(null); setShowRenameModal(true);  setIdToDelete(item?.id)}} style={{padding:"5px 15px 5px 15px"}}>Rename</div>
                                            <div className='hover' onClick={()=>{setActive(null); setShowDeleteModal(true); setIdToDelete(item?.id); }} style={{color:"red", padding:"5px 15px 5px 15px"}}>Delete</div>
                                        </div> : 
                                        ""
                                    }
                                </div> 
                            </div>
                })
            }
            <div>
                <img src={addNew} alt="add new file" style={{cursor:"pointer",width:"50px", height:"60px",margin:"30px 10px 20px"}} onClick={()=>{setShowModal(true);setActive(null)}} />
            </div>
            <React.Suspense fallback={<Fallback/>}>
                {
                    showModal ? 
                    <AddNewModal 
                        setShowModal={setShowModal} 
                        showModal={showModal}
                        createHandler={addFileOrFolder}
                        items={currentTree?.items}
                    /> :null
                }
                {
                    showDeleteModal ? 
                    <DeleteModal 
                        setShowModal={setShowDeleteModal} 
                        showModal={showDeleteModal}
                        handleDeleteNode={handleDeleteNode}
                        parentId={currentTree?.id}
                        id={idToDelete}
                        isFolder={true}
                    />
                    :null
                }
                {
                    showRenameModal ?
                    <RenameModal
                        setShowModal={setShowRenameModal} 
                        showModal={showRenameModal}
                        items={currentTree?.items}
                        handleRenameNode={handleRenameNode}
                        parentId = {currentTree.id}
                        id={idToDelete}
                        isFolder={true}
                    />
                    :null
                }
            </React.Suspense>
        </div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            {
                currentTree?.items?.length === 0 ? <img src={emptyfolder} alt="empty folder"/>:""
            }
        </div>
   </div>
  )
}

export default React.memo(Dashboard)