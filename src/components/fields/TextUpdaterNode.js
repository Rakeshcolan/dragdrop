import { useCallback, useState } from "react";
import { Handle, NodeResizeControl, NodeResizer, Position } from "reactflow";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
  }, []);
  const [inputValue, setInputValue] = useState(data.inputValue || "");
  console.log("dataaa",data);
  const controlStyle = {
    background: "transparent",
    border: "none",
  };

  const handleChange = (event) => {
    const data1 = event.target.value;

    setInputValue(data1);
    data.onChangeInput(data1, data.groupId);
  };

  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>

      <div
        className="text-updater-node groupnode groupnodediv"
        id={data.groupId}
      >

        <Handle
          type="source"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className="textareadiv quickdiv" >Quick Reply</div>
        <label className="groupLabel">Message:</label>
        <br></br>
        <textarea
        className="groupinput activeborder"
          rows="5"
          cols="20"
          value={data.label}
          onChange={(event) => handleChange(event)}
        ></textarea>
        {/* <input
          value={inputValue}
          className="groupinput"
          onChange={(event) => {
            const data1 = event.target.value;
            // console.log("event",data1,event.target);
            setInputValue(data1);
            data.onChangeInput(data1, data.groupId);
          }}
        ></input> */}
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default TextUpdaterNode;
