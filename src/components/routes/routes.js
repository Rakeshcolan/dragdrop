import ChatBot from "../../pages/chatbot"
import DnDFlow from "../../pages/home/dndflowindex"
import {Routes,Route} from "react-router-dom";

const getRoutes=()=>{
    return (
        <Routes>
            {/* <Route path="/" element= {<DnDFlow/>}></Route> */}
            <Route path="/" element= {<DnDFlow/>}></Route>
            <Route path="/chatbot" element = {<ChatBot/>}></Route>
        </Routes>
    )
}



export const routesConfig = ()=>{
    return getRoutes()
}