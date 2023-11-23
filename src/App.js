import {BrowserRouter} from "react-router-dom"

import { routesConfig } from "./components/routes/routes"

export const App = ()=>{
    const routerConfig = routesConfig();
    return (
        <>
        <BrowserRouter>
        {routerConfig}
        </BrowserRouter>
        </>
    )
}