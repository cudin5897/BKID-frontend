import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import "./ListStation.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ProviderTab from "../subcontainers/ProviderTab";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

// import CreateUser from "./CreateUser";

export default class StationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      station_name: "",
      station_address: "",
      station_status: "",
      applied_service: "",
      loading: true,
      list_transaction: []
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
  incHeight(number) {
    var el = document.getElementById("content");
    var height = el.offsetHeight;
    var newHeight = height + 15 * number;
    el.style.height = newHeight + "px";
  }
  async componentDidMount() {
    if (localStorage.getItem("provider_id") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/providers/login");
    }
    await this.setState({ providerID: localStorage.getItem("provider_id") });
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch("http://localhost:3000/stations/detail?id=" + id)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          station_name: data.station_name,
          station_address: data.location,
          station_status: data.status,
          applied_service: data.service.service_name
        })
      );
    await fetch("http://localhost:3000/transactions/station")
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          list_transaction: data
        })
      );
    await this.incHeight(this.state.list_transaction.length);

    // alert(this.state.list_station)
    this.setState({ loading: false });
  }

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.card_UID}</td>
        <td>{data.time}</td>
        <td>{data.price}</td>
        {/* <td>
                    <Link to={"/providers/servicepackage?id="+data.id}>
                        <button class="button button1">View</button>                                    
                    </Link>
				</td> */}
      </tr>
    );
    const Table = () => {
      {
        // alert();
        let array_table = [];
        if (this.state.list_transaction != []) {
          this.state.list_transaction.map(item => {
            array_table.push(
              <Table_cell
                // id={item._id}
                card_UID={item.card_UID}
                time={item.time}
                price={item.total_price}
              />
            );
          });
        }
        // alert(array_table);
        return array_table;
      }
    };
    return (
      <div>
        <ProviderSideMenu />
        <div id="leftside">
          <ProviderTab title={"Station Detail"} />
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
            <div>
              <div
                class="tab1"
                style={{
                  border: "solid 1px",
                  width: "346px",
                  height: "120px",
                  display: "inline-block"
                }}
              >
                Station Name:
                <br />
                <h2>
                  <b>{this.state.station_name}</b>
                </h2>
              </div>

              <span>&nbsp;&nbsp;</span>
              <div
                class="tab1"
                style={{
                  border: "solid 1px",
                  width: "460px",
                  height: "120px",
                  display: "inline-block"
                }}
              >
                Applied Service:
                <br />
                <h2>
                  <b>{this.state.applied_service}</b>
                </h2>
              </div>
              <span>&nbsp;&nbsp;</span>
              <div
                class="tab1"
                style={{
                  border: "solid 1px",
                  width: "240px",
                  height: "120px",
                  display: "inline-block"
                }}
              >
                Status:
                <br />
                <h2
                  style={{
                    color:
                      this.state.station_status == "Active" ? "green" : "red"
                  }}
                >
                  <b>{this.state.station_status}</b>
                </h2>
              </div>
              <div>
                <div
                  class="tab1"
                  style={{
                    border: "solid 1px",
                    width: "1065px",
                    height: "100px"
                  }}
                >
                  Address:
                  <br />
                  <h2>
                    <b>{this.state.station_address}</b>
                  </h2>
                </div>
              </div>
            </div>

            <br />
            <div>
              <table id="table1">
                <tr id="category">
                  <th>Card UID</th>
                  <th>Transaction Time</th>
                  <th>Total Amount</th>
                </tr>
                {Table()}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
