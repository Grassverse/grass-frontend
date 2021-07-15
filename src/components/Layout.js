import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = ({ nfts, updateUser }) => {
  return (
    <div>
      <Header updateUser={updateUser} />
      <Outlet />
    </div>
  );
};

export default Layout;
