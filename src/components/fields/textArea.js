import { useState } from "react";
import { Handle, Position } from "reactflow";
import "../../index.css";

const TextAreaUpdater = ({ data, isConnectable }) => {
  const [textValue, setTextValue] = useState("");
  const handleChange = (e) => {
    setTextValue(e.target.value);
    data.onChangeInput(e.target.value, data.nodeId);
  };
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
            value={data.label}
            onChange={(event) => handleChange(event)}
          ></textarea>
        </div>
      </div>
    </>
  );
};
export default TextAreaUpdater;
