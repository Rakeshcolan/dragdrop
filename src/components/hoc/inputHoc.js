import { useCallback, useContext, useEffect, useState } from "react";
import { NodeContext } from "../../nodecontext/nodeContext";


export const InputHoc = (FlowComponents)=>{
    const UpdateInput = ({data,...props})=>{
      console.log("dataaaaaaaaaaaaaaaa",data.nodeInstance?.getNodes);
        let contextdata = useContext(NodeContext);
        let dataNodeId = data.nodeId;
        // let dataInstance = data.nodeInstance;
      
        let {value,changeId,changeValue,handleDelete } = contextdata;
        const [inputValue, setInputValue] = useState(data.inputValue || "");
     
      
        const handleChange = (event) => {
          const data1 = event.target.value;
          setInputValue(data1);
          changeValue(event.target.value,dataNodeId)
          // data.onChangeInput(data1, data.groupId);
        };

        // const deleteNode = ()=>{
        //   handleDelete(dataNodeId,dataInstance)
        // }

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

        return <FlowComponents handleChange={handleChange} handleDrop={handleDrop}  inputValue={inputValue} data={data} {...props}/>
    }
    return UpdateInput;
}