import ReactDOM from "react-dom/client";
import { ContextProvider } from "./Context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
