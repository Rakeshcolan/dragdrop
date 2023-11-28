import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import "../../index.css"


function ButtonNode({ data, isConnectable }) {

  let buttonStyle = {
    backgroundColor:"#b1bab3",
    border:"none",
    width:"80px",
    height:"40px",
    borderRadius:"5px",
    textAlign:"center",
    boxShadow:" -4px 5px 5px 0px rgba(225, 230, 226)"

  }

  const [buttonName,setButtonName] = useState('')


  const updateButtonName = (e)=>{
    console.log("working onchange",e.target.value,data.nodeId);
    setButtonName(e.target.value)
    data.onChangeInput(e.target.value,data.nodeId)
  }

  return (
    <>
    

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
    <input type="text" value={data.label}  className="activeborder" style={buttonStyle} onChange={(e)=>updateButtonName(e)}/> 
      

   

    </>

  );
}

export default ButtonNode;
