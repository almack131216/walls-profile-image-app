import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../assets/logo.svg";
import ImagePreview from "../FileUpload/ImagePreview";

const Header = props => {
  return (
    <Navbar className="justify-content-between">
      <Navbar.Brand href="/">
        <img src={logo} className="logo" alt="logo" />
        <span className="logo-text">
          Walls<span>.io</span>
        </span>
      </Navbar.Brand>
      <div className="profile-img-wrap">
        <ImagePreview src={props.imgSrc} />
      </div>
    </Navbar>
  );
};

export default Header;
