import React, { Component } from "react";
import "./Home.css";
import NavBar from "../subcontainers/NavBar";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/543px-Logo-hcmut.svg.png */}
        <img
          id="anh_bk"
          src="https://cdn04.masterstudies.com/img/element_db/73/73111_Upon-arrival-page-cover.jpg"
          width="100%"
          height="100%"
        />
        <span id="general_data" class="center">
          BKID SMART CARD
          <br />
          <span style={{ fontSize: "25px" }}>
            a system using RFID card for enjoying service in campus conveniently{" "}
          </span>
          {/* <span style={{fontSize:"25px"}}>applied many services like parking, check attendance,... with card  </span> */}
          <br/>
          <span id="login_text" style={{textAlign:"center",paddingLeft:"50px"}}>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <button style={{ width:"400px",height:"40px",backgroundColor:"white",border:"2px solid #17a2b8" }} id="login_but"> Log In Now </button>
            </Link>
          </span>
        </span>
      </div>
    );
  }
}
