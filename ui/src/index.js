import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./routes/Home";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Chat from "./routes/Chat";
import Analysis from "./routes/Analysis";
import Language from "./routes/Language";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Language />,
  },
  {
    path: "/ai/:lang",
    element: <Home />,
  },
  {
    path: "/chat/:lang/:topic",
    element: <Chat />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
