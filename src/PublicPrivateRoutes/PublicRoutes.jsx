import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../PageLayout/Header";
import Footer from "../PageLayout/Footer";

const PublicRoutes = () => {
    const isAuth = useSelector((state) => state.authSlice.AuthStatus);
    console.log(isAuth)

  return !isAuth ? (
    <>
     <Header/>
     <Outlet/>
     {isAuth? <Footer/>: ""}
    </>
  ) : <Navigate to={"/"} />;
};

export default PublicRoutes;
