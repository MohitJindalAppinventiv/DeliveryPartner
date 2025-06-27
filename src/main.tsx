import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {  store } from "./store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  {/* <PersistGate loading={null} persistor={persistor}> */}

    <Provider store={store}>
        <App />
    </Provider>
  {/* </PersistGate> */}
  </BrowserRouter>
);
