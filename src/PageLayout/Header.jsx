import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, isLogout } from "../store/slices/AuthSlice";
import Modal from "../components/Modal";

const Header = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const authUser = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      console.log("inside header");
      navigator("/");
    }
  }, [isLogin]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(isLogout());
  };

  return (
    <>
      <div className={`header  ${scrolled ? "scrolled" : ""}`}>
        <div className="header-burger-icon flex-comman">
          <i class="fa-solid fa-bars" onClick={() => setShow(true)}></i>
        </div>
        <div className="header-helper-container flex-comman">
          <div className="header-logo-container">
            <img src="../../public/logologo.png" alt="error" />
          </div>
          <div
            className={`menu-icon flex-comman `}
            style={
              !authUser.AuthStatus
                ? { justifyContent: "flex-end" }
                : { justifyContent: "space-between" }
            }
          >
            <div
              className={`menu-bar flex-comman decoration-none ${
                !authUser.AuthStatus ? "hide-unnecessary-li" : ""
              }`}
            >
              <li>Home</li>
              <li>Features</li>
            </div>
            <div className="right-container flex-comman">
              {!authUser.AuthStatus ? (
                <ul className="flex-comman decoration-none">
                  <li>
                    <Link className="decoration-none" to={"/"}>
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link className="decoration-none" to={"/signup"}>
                      Sign Up
                    </Link>
                  </li>
                  <li className="flex-comman">
                    <button className="menu-btn btn-bg-handle">
                      Get started
                    </button>{" "}
                  </li>
                </ul>
              ) : (
                <ul className="flex-comman decoration-none">
                  <li>
                    <Link className="decoration-none">
                      <div
                        onClick={() => setDisplayModal(true)}
                        className="header-company-logo flex-comman btn-bg-handle"
                      >
                        W
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          show ? "show-slider" : "hide-slider"
        } show-hide-menu menu-bar flex-comman decoration-none`}
      >
        <div className="cross-slider flex-comman">
          <div className="header-logo-container">
            <img src="../../public/logologo.png" alt="error" />
          </div>
          <i
            onClick={() => setShow(false)}
            class="fa-solid fa-xmark"
            id="cross-icon"
          ></i>
        </div>

        <li
          className={`flex-comman decoration-none list-items`}
          onClick={() => setShow(false)}
        >
          Home
        </li>
        <li
          className={`flex-comman decoration-none list-items`}
          onClick={() => setShow(false)}
        >
          Features
        </li>
        <li
          className={`flex-comman decoration-none list-items`}
          onClick={() => setShow(false)}
        >
          Profile
        </li>
        <li
          className={`flex-comman decoration-none list-items`}
          onClick={() => setShow(false)}
        >
          About Us
        </li>
        <li
          className={`flex-comman decoration-none list-items`}
          onClick={() => {
            handleLogout();
            setShow();
          }}
        >
          Log Out
        </li>
      </div>

      {displayModal && (
        <Modal
          authUser={authUser.User}
          displayModal={displayModal}
          closeModal={() => setDisplayModal(false)}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
