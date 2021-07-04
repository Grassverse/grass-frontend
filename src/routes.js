import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NftPage from "./components/NftPage/NftPage";

const setPropsToRoutes = (nfts) => [
  {
    path: "/",
    element: <Layout nfts={nfts} />,
    children: [
      {
        path: "/",
        element: <Home nfts={nfts} />,
      },
      {
        path: "/nft",
        element: <NftPage nfts={nfts} />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default setPropsToRoutes;
