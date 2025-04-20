import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        className="[&>li]:!p-5 [&>li[data-sonner-toast][data-styled=true]]:!gap-4 [&>li[data-sonner-toast][data-styled=true]>[data-content]]:!items-start [&>li[data-sonner-toast][data-styled=true]>[data-content]>[data-description]]:!text-start"
        theme="light"
      />
    </BrowserRouter>
  </React.StrictMode>
);
