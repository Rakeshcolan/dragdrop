import { createSlice } from "@reduxjs/toolkit";

let flowArray = localStorage.getItem('object')

let initialState = {
    flowData:[],
    instanceNode:{},
     savedFlow:false,
     payPrice:5
    
}

export const flowSlice = createSlice({
    initialState,
    name:'createflow',
    reducers:{
        getFlow:(state,{payload})=>{
          
            state.flowData = [...state.flowData,payload.savedElements]
            
        },
        resetFormData:(state,{payload})=>{
         
            state.flowData = []
            state.payPrice = 2
        },

        addPayment:(state,{payload})=>{
            state.payPrice=state.payPrice+5;
        },
        addInstance:(state,{payload})=>{
            state.instanceNode = payload.instance
            
        }
    }
})


export  const {getFlow,resetFormData,addPayment,addInstance} = flowSlice.actions;

export default flowSlice.reducer;