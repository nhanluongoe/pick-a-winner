import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root";
import { Configuration } from "./pages/config";
import { Prizes } from "./pages/config/prizes";
import { Members } from "./pages/config/members";
import Awards from "./pages/config/awards";
import { Home } from "./pages";
import { Toaster } from "react-stacked-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "configuration",
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
            element: <Awards />,
          },
        ],
      },
    ],
  },
  {},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="center" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
