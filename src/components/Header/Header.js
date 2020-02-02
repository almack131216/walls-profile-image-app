import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../assets/logo.svg";
import ProfileImage from "./ProfileImage";

const Header = () => {
  return (
    <Navbar className="justify-content-between">
      <Navbar.Brand href="/">
        <img src={logo} className="logo" alt="logo" />
        <span className="logo-text">
          Walls<span>.io</span>
        </span>
      </Navbar.Brand>
      <ProfileImage />
    </Navbar>
  );
};

export default Header;
