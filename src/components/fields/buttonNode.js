import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import "../../index.css";
import { InputContext } from "../../inputcontext/inputContext";

function ButtonNode({ data, isConnectable }) {
  let buttonStyle = {
    backgroundColor: "#b1bab3",
    border: "none",
    width: "80px",
    height: "40px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: " -4px 5px 5px 0px rgba(225, 230, 226)",
  };
  let contextdata = useContext(InputContext)
  let {value,changeId,changeValue} = contextdata;

  const [buttonName, setButtonName] = useState("");
  const updateButtonName = (e) => {
    setButtonName(e.target.value);
    changeValue(e.target.value,data.nodeId)
    // data.onChangeInput(e.target.value, data.nodeId);
  };

  useEffect(()=>{
    if(data.label){
      setButtonName(data.label)
    }
  },[])

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <input
        type="text"
        value={buttonName}
        className="activeborder"
        style={buttonStyle}
        onChange={(e) => updateButtonName(e)}
      />
    </>
  );
}

export default ButtonNode;
