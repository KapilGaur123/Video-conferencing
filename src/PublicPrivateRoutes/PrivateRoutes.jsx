import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../PageLayout/Header";
import Footer from "../PageLayout/Footer";

const PrivateRoutes = () => {
  const isAuth = useSelector((state) => state.authSlice.AuthStatus);
  console.log(isAuth);

  return isAuth ? (
    <>
      <Header />
      <Outlet />
      {isAuth ? <Footer /> : ""}
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
