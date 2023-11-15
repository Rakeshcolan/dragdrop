import { useCallback, useState } from 'react';
import { Handle, NodeResizeControl, NodeResizer, Position } from 'reactflow';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
        style={{ position: 'absolute', right: 5, bottom: 5 }}
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

function TextUpdaterNode({ data,isConnectable }) {
  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
  }, []);
  const [inputValue, setInputValue] = useState(data.inputValue || "");

  const controlStyle = {
    background: 'transparent',
    border: 'none',
  };

  return (
    <>
    
    <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>

    <div className="text-updater-node groupnode" id={data.groupId}  style={{height:"300px",width:"150px",border:"#95bfb0 3px solid",boxShadow: "6px 4px 19px -6px rgba(0,0,0,0.75)"}}>
      <Handle type="source" position={Position.Top} isConnectable={isConnectable} />
      <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                         const data1 = editor.getData();
                        console.log(event,data1);
                        setInputValue(data1)
                        data.onChangeInput(data1,data.groupId)
                       
                    } }
                    onBlur={ ( event, editor ) => {
                      
                    } }
                    onFocus={ ( event, editor ) => {
                      
                    } }
                />
                <Handle type="target" position={Position.Left} isConnectable={isConnectable} />

      {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
      
    
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
    <div>
    <Handle type="target" position={Position.Right} id="c" isConnectable={isConnectable} />
    <button>Okay</button> */}
    </div>
   

    </>

  );
}

export default TextUpdaterNode;
