import ReactDOM from "react-dom/client";

import "./bootstrap.js";

import RouterProvider from "./router";
import { AuthProvider } from "hooks";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider />
  </AuthProvider>
);
