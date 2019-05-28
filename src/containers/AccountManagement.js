import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import { Link } from "react-router-dom";
import Tab from "../subcontainers/Tab";

export default class AccountManagement extends Component {
  async componentDidMount() {
    // alert( localStorage.getItem("email"));
    if (localStorage.getItem("email") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <SideMenu />
        <div id="leftside">
          <Tab title={"Account Management"} />

          {/* //content */}
          <div id="content">
            <br />
            <br />
            <br />
            <br />
            <Link to={"/listprovider?page=1"}>
              <div class="tab10">
                <img
                  src="https://image.flaticon.com/icons/svg/992/992924.svg"
                  width="200px"
                  height="200px"
                />
                <h1 id="bebas1">
                  <b>
                    Provider Account
                    <br />
                    <span
                      class="glyphicon glyphicon-log-in"
                      style={{ float: "left", paddingTop: "40px" }}
                    />
                  </b>
                </h1>
              </div>
            </Link>

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Link to={"/listuser?page=1"}>
              <div class="tab10">
                <img
                  src="https://image.flaticon.com/icons/svg/1201/1201175.svg"
                  width="200px"
                  height="200px"
                />
                <h1 id="bebas1">
                  <b>
                    Student Account
                    <br />
                    <span
                      class="glyphicon glyphicon-log-in"
                      style={{ float: "left", paddingTop: "40px" }}
                    />
                  </b>
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
