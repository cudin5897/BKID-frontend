import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import "./dashboard.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Popup from "reactjs-popup";
import CanvasJSReact from "../canvasjs.react";
import ProviderTab from "../subcontainers/ProviderTab";
import { ClipLoader } from "react-spinners";
import Tab from "../subcontainers/Tab";
import { Link } from "react-router-dom";

const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

// import CreateUser from "./CreateUser";

export default class ProviderDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      service_quantity: "",
      transaction_quantity: "",
      station_quantity: "",
      loading: true
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  async componentDidMount() {
    if (localStorage.getItem("provider_id") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/providers/login");
    }

    await fetch(
      "http://localhost:3000/services/providerID/" +
        localStorage.getItem("provider_id")
    )
      .then(response => response.json())
      .then(data => this.setState({ service_quantity: data.length }));
    await fetch(
      "http://localhost:3000/stations/providerID/" +
        localStorage.getItem("provider_id")
    )
      .then(response => response.json())
      .then(data => this.setState({ station_quantity: data.length }));
    await fetch("http://localhost:3000/transactions/length")
      .then(response => response.json())
      .then(data => this.setState({ transaction_quantity: data.length }));
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <ProviderSideMenu />
        <div id="leftside">
          <ProviderTab title={"Dashboard"} />
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#36D7B7"}
            loading={this.state.loading}
          />
          <div
            id="content"
            style={{ visibility: this.state.loading ? "hidden" : "visible" }}
          >
            <div id="access_tab">General data</div>
            <div style={{}}>
              <div id="square1">
                <img
                  src="https://image.flaticon.com/icons/svg/490/490341.svg"
                  width="100px"
                  height="100px"
                />
                <h4>
                  <b>Services</b>{" "}
                </h4>
                <br />
                Total: <b>{this.state.service_quantity}</b>
              </div>

              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="square3">
              <img
                  src="https://image.flaticon.com/icons/svg/856/856055.svg"
                  width="100px"
                  height="100px"
                />
                <h4>
                  <b>Transactions</b>{" "}
                </h4>{" "}
                <br />
                Total: <b>{this.state.transaction_quantity}</b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="square3">
              <img
                  src="https://image.flaticon.com/icons/svg/1662/1662013.svg"
                  width="100px"
                  height="100px"
                />
                <h4>
                  <b>Stations</b>{" "}
                </h4>{" "}
                <br />
                Total: <b>{this.state.station_quantity}</b>
              </div>
              <br />
              <br />
              <div id="access_tab" style={{ textAlign: "left" }}>
                Quick access
              </div>
              <br />

              <Link to={"listservice?page=1"}>
                <div id="personalInfo" class="tab3" style={{ height: "200px" }}>
                  {/* <img src="https://image.flaticon.com/icons/svg/1625/1625539.svg" width="150px" height="150px" /> */}
                  <h3 id="bebas1">
                    <b>
                      Service Management &nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        class="glyphicon glyphicon-log-in"
                        style={{ float: "right" }}
                      />
                    </b>
                  </h3>
                </div>
              </Link>
              <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Link to={"/providers/liststation"}>
                <div
                  id="accountManagement"
                  class="tab5"
                  style={{ height: "200px" }}
                >
                  {/* <img src="https://image.flaticon.com/icons/svg/236/236832.svg" width="150px" height="150px" /> */}
                  <h3 id="bebas1">
                    <b>
                      Station Management &nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        class="glyphicon glyphicon-log-in"
                        style={{ float: "right" }}
                      />
                    </b>
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
