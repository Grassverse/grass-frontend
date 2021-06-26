import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NftPage from "./components/NftPage/NftPage";

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
        path: "/nft",
        element: <NftPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default routes;
