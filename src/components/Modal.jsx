import React, { useEffect, useRef } from "react";
import '../PageLayout/Header.css'
import { Link } from "react-router-dom";

const Modal = ({authUser, displayModal, closeModal, handleLogout}) => {
  const modalRef = useRef(null);

  useEffect(()=> {
    const handleModalView = (e)=> {
        if(modalRef.current && !modalRef.current.contains(e.target)){
            closeModal();
        }
    }

    document.addEventListener("mousedown", handleModalView);

    return () => document.removeEventListener("mousedown", handleModalView);
  },[closeModal])

  return (
    <>
      <div
        ref={modalRef}
        className={`${
          displayModal ? "show-slider" : "hide-slider"
        } website-main-icon menu-bar flex-comman decoration-none`}
      >
        <div className="border-botton webicon-email webicon-comman">
          <li className={`flex-comman `}>{authUser.email}</li>
        </div>
        <div className="webicon-comman">
          <li className={`flex-comman decoration-none`}>Profile</li>
        </div>
        <div className="webicon-comman">
          <li className={`flex-comman decoration-none`}>Setting</li>
        </div>
        <div className="border-top webicon-comman">
          <li className={`flex-comman decoration-none`} onClick={()=>{handleLogout(); closeModal();}}>Log Out</li>
        </div>
      </div>
    </>
  );
};

export default Modal;
