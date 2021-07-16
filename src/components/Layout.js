import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = ({ updateUser, updateContracts }) => {
  return (
    <div>
      <Header updateUser={updateUser} updateContracts={updateContracts} />
      <Outlet />
    </div>
  );
};

export default Layout;
