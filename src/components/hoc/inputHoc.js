import { useCallback, useContext, useEffect, useState } from "react";
import { NodeContext } from "../../nodecontext/nodeContext";

export const InputHoc = (FlowComponents) => {
  const UpdateInput = ({ data, ...props }) => {
    let contextdata = useContext(NodeContext);
    let dataNodeId = data.nodeId;

    let { changeValue } = contextdata;
    const [inputValue, setInputValue] = useState(data.inputValue || "");

    const handleChange = (event) => {
      //to handle common input change 
      const data1 = event.target.value;
      setInputValue(data1);
      changeValue(event.target.value, dataNodeId);
     
    };


    useEffect(() => {
      if (data.label) {
        setInputValue(data.label);
      }
    }, [data.label]);

    const handleDrop = (e) => {
      let dropValue = `{${e.dataTransfer.getData("value")}}`;
      let prevValue = inputValue + dropValue;
      setInputValue((prevstate) => prevstate + dropValue);
      changeValue(prevValue, dataNodeId);
    };

    return (
      <FlowComponents
        handleChange={handleChange}
        handleDrop={handleDrop}
        inputValue={inputValue}
        dataone = {data}
        {...props}
      />
    );
  };
  return UpdateInput;
};
