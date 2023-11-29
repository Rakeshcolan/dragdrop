import { useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import "../../index.css";
import { InputContext } from "../../inputcontext/inputContext";

const TextAreaUpdater = ({ data, isConnectable }) => {
  let contextdata = useContext(InputContext)
  let {value,changeId,changeValue} = contextdata;
  const [textValue, setTextValue] = useState("");
  const handleChange = (e) => {
    setTextValue(e.target.value);
    changeValue(e.target.value,data.nodeId)
    // data.onChangeInput(e.target.value, data.nodeId);
  };

  useEffect(()=>{
    if(data.label){
      setTextValue(data.label)
    }
  },[])
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="textareacontainer">
        <div
          className="textareadiv quickdiv"
          style={{ backgroundColor: "#db5290" }}
        >
          {" "}
          Response{" "}
        </div>
        <div>
          <textarea
            rows="5"
            cols="15"
            className="grouptextarea activeborder"
            value={textValue}
            onChange={(event) => handleChange(event)}
          ></textarea>
        </div>
      </div>
    </>
  );
};
export default TextAreaUpdater;
