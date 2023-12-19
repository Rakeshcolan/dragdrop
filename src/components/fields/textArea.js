import { Handle, Position } from "reactflow";
import "../../index.css";
import { InputHoc } from "../hoc/inputHoc";

const TextAreaUpdater = ({   data, isConnectable,handleChange,handleDrop,inputValue }) => {

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
            value={inputValue}
            onChange={(event) => handleChange(event)}
            onDrop={(e)=>handleDrop(e)}
          ></textarea>
        </div>
      </div>
    </>
  );
};
export default InputHoc(TextAreaUpdater);
