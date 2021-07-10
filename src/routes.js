import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NftPage from "./components/NftPage/NftPage";
import CreateNft from "./components/CreateNft/CreateNft";
import Profile from "./components/Profile/Profile";

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
        path: "/nft/:id",
        element: <NftPage nfts={nfts} />,
      },
      {
        path: "/create-nft",
        element: <CreateNft />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default setPropsToRoutes;
