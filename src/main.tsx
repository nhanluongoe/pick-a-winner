import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root";
import { Configuration } from "./pages/config";
import { Prizes } from "./pages/config/Prizes";
import { Members } from "./pages/config/Members";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/configuration",
    element: <Configuration />,
    children: [
      {
        path: "prizes",
        element: <Prizes />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "awards",
        element: <div>Awards</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
