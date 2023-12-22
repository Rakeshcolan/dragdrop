import { Provider } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routesConfig } from "./components/routes/routes";
import { flowStore, persistor } from "./redux/flowStore";
import { PersistGate } from 'redux-persist/integration/react';
import { NodeContextProvider } from "./nodecontext/nodeContext";


export const App = () => {
  const routerConfig = useRoutes(routesConfig());
  return (
    <Provider store={flowStore}>
        <PersistGate loading={null} persistor={persistor}>
          <NodeContextProvider>
             {routerConfig}
          </NodeContextProvider>
      </PersistGate>
    </Provider>
  );
};
