import {useState } from "react";
import "./styles.css";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [explorerData, setExplorerData] = useState({
    id:"1",
    name: "root",
    isFolder: true,
    items: []
  });
  const [currentTree , setCurrentTree] = useState(explorerData)
  const [breadcrumb , setBreadCrumb] = useState([{name:"root",id:"1"}])

  /*-------------------------------------------insert node------------------------------------ */

  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id:new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  
  const handleInsertNode = (folderId, item, isFolder) => {
    const explorerDataClone = structuredClone(explorerData)
    const finalTree = insertNode(explorerDataClone, folderId, item, isFolder);
    findChildTree(finalTree , folderId, isFolder)
    setExplorerData(finalTree); 
  };


  /*-------------------------------------------find current tree------------------------------------ */
  
  const findChildTree = (tree, folderId, isFolder) => {
    let child;
    if(tree.id === folderId){
        setCurrentTree(tree)
        child = tree.items 
        return child
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return findChildTree(ob, folderId, isFolder);
    });
  }

  const getChildTree = (folderId) => {
    const childTree = findChildTree(explorerData, folderId)
  }

  /*-------------------------------------------rename------------------------------------ */

  const renameNode = function (tree, folderId, item, isFolder, itemId) {
    if (tree.id === folderId && tree.isFolder) {
      const index = tree.items.findIndex((item)=>{ return Number(item?.id) === Number(itemId)})
      tree.items[index].name = item;
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return renameNode(ob, folderId, item, isFolder, itemId);
    });

    return { ...tree, items: latestNode };
  };

  
  const handleRenameNode = (folderId, item, isFolder,itemId) => {
    const explorerDataClone = structuredClone(explorerData)
    const finalTree = renameNode(explorerDataClone, folderId, item, isFolder,itemId);
    findChildTree(finalTree , folderId, isFolder)
    setExplorerData(finalTree); 
  };

  /* delete node */
  const deleteNode = function (tree, folderId,isFolder, id) {
    if (Number(tree.id) === Number(folderId)) {
       const index = tree.items?.findIndex((e)=>Number(e?.id) === Number(id))
       tree?.items?.splice(index,1);
      return tree
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return deleteNode(ob, folderId, isFolder, id);
    });

    return { ...tree, items: latestNode };
  };

  const handleDeleteNode = (folderId, isFolder,index) => {
    const explorerDataClone = structuredClone(explorerData)
    const finalTree = deleteNode(explorerDataClone, folderId, isFolder,index);
    findChildTree(finalTree , folderId, isFolder)
    setExplorerData(finalTree); 
  };


  return (
    <div className="App">
      <Dashboard 
        currentTree={currentTree} 
        getChildTree={getChildTree} 
        handleInsertNode={handleInsertNode} 
        handleRenameNode={handleRenameNode}
        breadcrumb={breadcrumb}
        setBreadCrumb={setBreadCrumb}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}