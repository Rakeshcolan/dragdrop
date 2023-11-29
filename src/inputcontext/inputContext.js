import { createContext, useState } from "react";


export const InputContext = createContext();

export const InputContextProvider = ({children})=>{
    const [inputvalue,setInputValue] = useState('');
    const [changeId,setChangeId] =useState('')

    const UpdateInput = (val,id)=>{
        setInputValue(val);
        setChangeId(id)
    }

    return<InputContext.Provider value={{value:inputvalue,changeId,changeValue:UpdateInput}}>{children}</InputContext.Provider>
}