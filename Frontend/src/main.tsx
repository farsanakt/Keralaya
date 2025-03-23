import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "@/contexts/SocketContext"; // ✅ Move it here

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider> {/* ✅ Now wraps the entire app properly */}
            <App />
          </SocketProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
