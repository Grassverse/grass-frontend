import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default routes;
