import { useState } from "react";
import { Handle, Position } from "reactflow";

const TextAreaUpdater = ({ data,isConnectable })=>{

    const [textValue,setTextValue] = useState('')
    const handleChange = (e)=>{
        setTextValue(e.target.value)
        data.onChangeInput(e.target.value,data.nodeId)
    }
    return(
        <>
        <Handle type="target" position={Position.Left}/>
        <textarea rows="5" cols="33" value={textValue} onChange={(event)=>handleChange(event)}>
            
        </textarea>
        </>
    )
}
export default TextAreaUpdater;