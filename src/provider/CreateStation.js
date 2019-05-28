import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import "./CreateStation.css";
import { Link } from "react-router-dom";
import ProviderTab from "../subcontainers/ProviderTab";

export default class CreateStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list_service: [],
      list_service_package: [],
      length: "",
      current_service_id: "",
      current_service_name: "",
      user_name: "",
      user_password: "",
      station_name: "",
      location: "",
      providerID: "",
      service: "",
      service_package: []
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
    await this.setState({ providerID: localStorage.getItem("provider_id") });
    await fetch(
      "http://localhost:3000/services/providerID/" + this.state.providerID
    )
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          list_service: data.list_service,
          length: data.length
        })
      );
    // alert(this.state.list_service)
  }

  //handle change normal
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  //handle change for select service only
  handleChangeforService = async event => {
    var index = event.nativeEvent.target.selectedIndex;

    await this.setState({
      current_service_id: event.target.value,
      current_service_name: event.nativeEvent.target[index].text
    });
    // await alert(this.state.current_service_id);
    // await alert(this.state.current_service_name);
    // alert(this.state.current_service_id)
    await fetch(
      "http://localhost:3000/services/" +
        this.state.current_service_id +
        "/package"
    )
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          list_service_package: data.list_service_package,
          length: data.length
        })
      );
    // await alert(this.state.list_service_package)
  };
  handleChangeforServicePackage = async event => {
    var index = event.nativeEvent.target.selectedIndex;

    await this.setState({
      current_service_id: event.target.value,
      current_service_name: event.nativeEvent.target[index].text
    });
  };
  // GET CHECKED DAYS
  async getChoosenServicePackage() {
    var checkedBoxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    let currentServicePackages = [];
    checkedBoxes.forEach(async function(item) {
      await currentServicePackages.push({
        service_package_name: item.name,
        service_packageID: item.value
      });
    });
    await this.setState({ service_package: currentServicePackages });
  }
  //handle when submit
  handleSubmit = async event => {
    await this.getChoosenServicePackage();
    // await alert(this.state.service_package[0].service_package_name)
    let api = "http://localhost:3000/stations";
    if (
      this.state.user_name == "" ||
      this.state.station_name == "" ||
      this.state.location == "" ||
      this.state.password == "" ||
      this.state.serviceID == "" ||
      this.state.service_package == []
    ) {
      alert("Please fill full data");
    } else {
      event.preventDefault();
      await fetch(api, {
        method: "POST",
        body: JSON.stringify({
          user_name: this.state.user_name,
          user_password: this.user_password,
          station_name: this.state.station_name,
          location: this.state.location,
          providerID: this.state.providerID,
          service: {
            serviceID: this.state.current_service_id,
            service_name: this.state.current_service_name
          },
          service_package: this.state.service_package
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status == 200) {
            alert("Create successfully!");
            this.props.history.push("/providers/liststation");
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert("Cannot create new user");
        });
    }
  };

  render() {
    const service_selection = () => {
      {
        let array_table = [];
        const Tag = "option";
        if (this.state.list_service != []) {
          this.state.list_service.map(item => {
            array_table.push(
              // '<option '+"id='"+item._id+"'>"+
              // item.name+
              // '</option>'
              <Tag value={item._id} name={item.name}>
                {item.name}
              </Tag>
            );
          });
        }
        return array_table;
      }
    };
    const service_package_selection = () => {
      {
        let array_table = [<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>];
        if (this.state.list_service_package != []) {
          this.state.list_service_package.map(item => {
            array_table.push(
              <input type="checkbox" value={item._id} name={item.name} />,
              <span>{item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
          <ProviderTab title={"Create Station"} />

          <div id="content">
            <div id="station_account">
              <span id="bebas">Station Account</span>
              <br />
              <div id="station_tab">
                <b>User name:</b>
                <br />
                <input
                  id="user_name"
                  type="text"
                  placeholder="Enter user name..."
                  onChange={this.handleChange}
                />
              </div>
              <div id="station_tab">
                <b>Password:</b>
                <br />
                <input
                  id="user_password"
                  type="password"
                  placeholder="Enter password here..."
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <br />
            <div id="station_data">
              <div style={{ textAlign: "center" }}>
                <span id="bebas">Station Information</span>
              </div>
              <div id="station_tab">
                <b>Station name:</b>
                <br />
                <input
                  type="text"
                  id="station_name"
                  name="stationName"
                  placeholder="Enter name of station here..."
                  onChange={this.handleChange}
                />
              </div>
              <div id="station_tab">
                <b>Location:</b>
                <br />
                <input
                  type="text"
                  id="location"
                  name="stationLocation"
                  placeholder="Enter location of station here..."
                  onChange={this.handleChange}
                />
              </div>

              <div id="station_tab">
                <b>Choose service:</b>
                <span>&nbsp;&nbsp;&nbsp;</span> <br />
                <select
                  id="current_service_id"
                  onChange={this.handleChangeforService}
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {service_selection()}
                </select>
              </div>
              <br />

              <div id="station_mini_tab">
                <b>
                  Choose service package (Please choose service first for
                  display its packages):
                </b>
                <br />
                <br />

                {service_package_selection()}
              </div>
            </div>

            <div class="buttonHolder">
              <input type="button" value="CREATE" onClick={this.handleSubmit} />
              <Link
                to={"/providers/liststation"}
                style={{ textDecoration: "none" }}
              >
                <input type="button" value="ABORT" />
              </Link>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
