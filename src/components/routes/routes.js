import ChatBot from "../../pages/chatbot"
import DnDFlow from "../../pages/home/dndflowindex"
import {Routes,Route} from "react-router-dom";
import { userRoutes } from "../../utils/routeArray";

const getRoutes=()=>{
    return (userRoutes)
}



export const routesConfig = ()=>{
    return getRoutes()
}