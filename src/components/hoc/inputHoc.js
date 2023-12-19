import { useCallback, useContext, useEffect, useState } from "react";
import { InputContext } from "../../inputcontext/inputContext";


export const InputHoc = (FlowComponents)=>{
    const UpdateInput = ({data,...props})=>{
        let contextdata = useContext(InputContext);
        let dataNodeId = data.nodeId;
      
        let {value,changeId,changeValue} = contextdata;
        const [inputValue, setInputValue] = useState(data.inputValue || "");
     
      
        const handleChange = (event) => {
          const data1 = event.target.value;
          setInputValue(data1);
          changeValue(event.target.value,dataNodeId)
          // data.onChangeInput(data1, data.groupId);
        };

        useEffect(()=>{
          if(data.label){
            setInputValue(data.label)
          }
        },[])
      
        const handleDrop = (e)=>{
          let dropValue = `{${e.dataTransfer.getData('value')}}`;
          let prevValue = inputValue+dropValue;
          setInputValue((prevstate)=>prevstate+dropValue);
          changeValue(prevValue,dataNodeId)
        }

        return <FlowComponents handleChange={handleChange} handleDrop={handleDrop} inputValue={inputValue} data={data} {...props}/>
    }
    return UpdateInput;
}