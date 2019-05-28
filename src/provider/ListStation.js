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

export default class ListStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list_station: [],
      length: "",
      provider_id: "",
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
    await fetch(
      "http://localhost:3000/stations/providerID/" + this.state.providerID
    )
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          list_station: data.list_station,
          length: data.length
        })
      );
    // alert(this.state.list_station)
    await this.incHeight(this.state.list_station.length);
    this.setState({ loading: false });
  }

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.station_name}</td>
        <td>{data.location}</td>
        <td>{data.status}</td>
        <td>{data.service}</td>
        <td>
          <Link to={"transaction/station?id=" + data.id}>
            <button class="button button2">View  &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" ></span></button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        let array_table = [];

        if (this.state.list_station != []) {
          this.state.list_station.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                station_name={item.station_name}
                location={item.location}
                status={item.status}
                service={item.service.service_name}
              />
            );
          });
        }
        return array_table;
      }
    };

    return (
      <div>
        <ProviderSideMenu />
        <div id="leftside">
          <ProviderTab title={"List Station"} />

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
            <Link
              to={"/providers/createstation"}
              style={{ textDecoration: "none" }}
            >
              <div id="create_station" display={{textAlign:"center"}}>
                Create New Station<span>&nbsp;&nbsp;&nbsp;</span>
                <span class="glyphicon glyphicon-plus" ></span>
              </div>
            </Link>

            <div>
              <table id="table1">
                <tr id="category">
                  <th>Station name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Applied service</th>
                  <th>Action</th>
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
