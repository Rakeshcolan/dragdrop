import { createSlice } from "@reduxjs/toolkit";

let flowArray = localStorage.getItem('object')

let initialState = {
    flowData:[],
     savedFlow:false
    
}

export const flowSlice = createSlice({
    initialState,
    name:'createflow',
    reducers:{
        getFlow:(state,{payload})=>{
            console.log("payloadd",payload.savedElements);
            state.flowData = [...state.flowData,payload.savedElements]
            
        },
        resetFormData:(state,{payload})=>{
            console.log("working ");
            state.flowData = []
        }
    }
})


export  const {getFlow,resetFormData} = flowSlice.actions;

export default flowSlice.reducer;