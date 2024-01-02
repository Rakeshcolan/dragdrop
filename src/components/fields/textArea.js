import { Handle, Position } from "reactflow";
import "../../index.css";
import DeleteIcon from "../common/deleteIcon/deleteIcon";
import { InputHoc } from "../hoc/inputHoc";

const TextAreaUpdater = ({   isConnectable,handleDelete,handleChange,handleDrop,inputValue,dataone }) => {

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="textareacontainer" style={{position:"relative"}}>
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
        <DeleteIcon  deleteId={dataone.nodeId}/>
      </div>
    </>
  );
};
export default InputHoc(TextAreaUpdater);
