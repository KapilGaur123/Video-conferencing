import React from "react";
import { FaFigma , FaInstagramSquare, FaGithub, FaTwitter} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container flex-vertical">
        <div className="upper-footer">
          <div className="flex-vertical flex-gap upper-logo-session">
            <div className="header-logo-container footer-logo-container">
              <img src="../../public/logologo.png" alt="error" />
            </div>
            <button className="btn-bg-handle">Contact Us</button>
          </div>
          <div>
            <ul className="decoration-none flex-vertical flex-gap upper-footer-links">
              <li className="cursor-comman">About</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Gallery</li>
              <li>Team</li>
            </ul>
            
          </div>
          <div className="flex-vertical flex-gap upper-icon ">
              <FaGithub />
              <FaFigma />
              <FaInstagramSquare/>
              <FaTwitter />
            </div>
        </div>
        <div className="lower-footer flex-horizontal">
            <div className="lower-footer-container">
              <div className="footer-p-tag">
              <p className="first-p">© 2021 All Rights Reserved</p>
              <p className="second-p">+1 800 854-36-80</p>
            </div>
            <ul className="flex-horizontal decoration-none flex-gap">
                <li>Privacy Policy</li>
                <li>Teams of Use</li>
                <li>Sales and Refunds</li>
                <li>Legal</li>
                <li>Site Map</li>
            </ul>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
