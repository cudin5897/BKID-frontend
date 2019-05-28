import React, { Component } from "react";
import "./NavBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <div id="navabar"  style={{ float: "left",paddingLeft:"50px" }}>
        
        
          <span id="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/543px-Logo-hcmut.svg.png"
              width="42"
              height="42"
            />
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Link to={""} style={{ textDecoration: "none", color: "white" }}>
            BKID Smart Card
            </Link>
          </span>
            
          

        {/* <span id="home_text" style={{ float: "left" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "gray" }}>
            Home
          </Link>
        </span> */}
        <span id="login_text" style={{ float: "right" }}>
          <Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>
            <button id="login_but"> Log in </button>
            
          </Link>
        </span>
      </div>
    );
  }
}

export default NavBar;
