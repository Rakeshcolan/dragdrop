import { Handle, Position } from "reactflow";
import "../../index.css";
import DeleteIcon from "../common/deleteIcon/deleteIcon";
import { InputHoc } from "../hoc/inputHoc";
function ButtonNode(props) {
  const { dataone, isConnectable, handleChange, inputValue } = props;
  let buttonStyle = {
    backgroundColor: "#b1bab3",
    border: "none",
    width: "80px",
    height: "40px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: " -4px 5px 5px 0px rgba(225, 230, 226)",
  };
console.log("buttonnodeid",dataone.nodeId);
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
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={inputValue}
          className="activeborder"
          style={buttonStyle}
          onChange={(e) => handleChange(e)}
        />
        <DeleteIcon
         
          deleteId={dataone.nodeId}
        />
      </div>
    </>
  );
}

export default InputHoc(ButtonNode);
