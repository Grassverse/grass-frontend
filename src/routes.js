import { Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import NftPage from "./components/NftPage/NftPage";
import CreateNft from "./components/CreateNft/CreateNft";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";

const setPropsToRoutes = (
  nfts,
  user,
  updateUser,
  contracts,
  updateContracts
) => {
  if (user)
    return [
      {
        path: "/",
        element: (
          <Layout updateUser={updateUser} updateContracts={updateContracts} />
        ),
        children: [
          {
            path: "/",
            element: <Home nfts={nfts} />,
          },
          {
            path: "/nft/:id",
            element: <NftPage user={user} contracts={contracts} />,
          },
          {
            path: "/create-nft",
            element: <CreateNft />,
          },
          {
            path: "/profile",
            element: <Profile user={user} />,
          },
          {
            path: "/edit-profile",
            element: <EditProfile user={user} />,
          },
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ];

  return [
    {
      path: "/",
      element: (
        <Layout
          nfts={nfts}
          updateUser={updateUser}
          updateContracts={updateContracts}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home nfts={nfts} />,
        },
        {
          path: "/nft/:id",
          element: <NftPage contracts={contracts} />,
        },
        {
          path: "/create-nft",
          element: <CreateNft />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ];
};

export default setPropsToRoutes;
