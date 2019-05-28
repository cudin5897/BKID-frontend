import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import Popup from "reactjs-popup";
import "./ServiceDetail.css";
import { Link } from "react-router-dom";
import ProviderTab from "../subcontainers/ProviderTab";

import readXlsxFile from "read-excel-file";
import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

// import CreateUser from "./CreateUser";

export default class ServiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      price: 0,
      quota_type: "",
      active_time: "",
      inactive_time: "",
      active_duration: "",
      active_days_in_week: [],
      start_date: "",
      end_date: "",
      start_register_date: "",
      end_register_date: "",
      list_served_object: [],
      service_name: "",
      service_status: "",
      service_created_date: "",
      service_description: "",
      service_hasCheckinout: "",
      loading: true,
      service_id: "",
      list_package: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  // GET DATA FROM EXCEL FILE
  async getExcelFile() {
    const input = document.getElementById("inputFile");
    let list_object = [];

    await readXlsxFile(input.files[0]).then(rows => {
      // `rows` is an array of rows
      // each row being an array of cells.
      // const dataType = rows[0];
      rows.shift();
      // alert(dataType[0]);
      rows.forEach(function(item) {
        list_object.push({
          obj_name: item[0],
          id: item[1],
          group: item[2]
        });
      });
    });
    await this.setState({
      list_served_object: list_object
    });
  }
  // GET CHECKED DAYS
  async getCheckedDays() {
    var checkedBoxes = document.querySelectorAll(
      "input[name=active_days_in_weeks]:checked"
    );
    let currentDays = [];
    checkedBoxes.forEach(function(item) {
      currentDays.push(item.value);
    });
    await this.setState({ active_days_in_week: currentDays });
  }
  async componentDidMount() {
    if (localStorage.getItem("provider_id") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/providers/login");
    }
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    const page = params.get("page"); // bar
    await this.setState({ service_id: id });
    await fetch("http://localhost:3000/services/detail?id=" + id)
      .then(respone => respone.json())
      .then(
        async data =>
          await this.setState({
            service_name: data.result.name,
            service_status: data.result.status,
            service_hasCheckinout: data.result.hasCheckinout,
            service_description: data.result.description,
            service_created_date: data.result.created_date
          })
      );

    await fetch(
      "http://localhost:3000/services/listpackage?page=" + page + "&id=" + id
    )
      .then(respone => respone.json())
      .then(
        async data =>
          await this.setState({
            page: page,
            list_package: data.docs,
            pages: data.pages
          })
      );
    await this.setState({ loading: false });
    // await alert(this.state.list_package[0].name)
  }

  //HANDLE SUBMIT
  handleSubmit = async event => {
    await this.getExcelFile();
    this.getCheckedDays();
    event.preventDefault();
    await fetch("http://localhost:3000/services/create/package", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          alert("Created succesfully!");
          this.setState({ open: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        alert("Package had not been created yet");
      });
  };

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.name}</td>
        <td>{data.active_time}</td>
        <td>{data.inactive_time}</td>
        <td>{data.active_duration}</td>
        <td>{data.price}</td>
        <td>{new Date(data.start_date).toDateString()}</td>
        <td>
          <Link to={"/providers/servicepackage?id=" + data.id}>
            <button class="button button2">
              View &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" />
            </button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        // alert();
        let array_table = [];
        if (this.state.list_package != []) {
          this.state.list_package.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                name={item.name}
                price={item.price}
                quota_type={item.quota_type}
                active_time={item.active_time}
                inactive_time={item.inactive_time}
                start_date={item.start_date}
                end_date={item.end_date}
                active_duration={item.active_duration}
              />
            );
          });
        }
        // alert(array_table);
        return array_table;
      }
    };
    const Paginate_element = () => {
      let paginate_array = [
        // <a href="#">&laquo;</a>
      ];
      const params = new URLSearchParams(this.props.location.search);
      const id = params.get("id"); // bar
      if (this.state.pages != "") {
        for (var i = 1; i <= this.state.pages; i++) {
          if (this.state.page == i) {
            paginate_array.push(
              <a
                class="active"
                href={
                  "http://localhost:3000/services/listpackage?page=" +
                  i +
                  "&id=" +
                  id
                }
              >
                {i}
              </a>
            );
          } else {
            paginate_array.push(
              <a
                href={
                  "http://localhost:3000/services/listpackage?page=" +
                  i +
                  "&id=" +
                  id
                }
              >
                {i}
              </a>
            );
          }
        }
      }
      paginate_array
        .push
        // <a href="#">&raquo;</a>
        ();
      return paginate_array;
    };
    return (
      <div>
        <ProviderSideMenu />
        <div id="leftside">
          <ProviderTab title={"Service Detail"} />

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
            Service name: {this.state.service_name} <br />
            Service type: Paid
            <br />
            Description: {this.state.service_description}
            <br />
            <button class="button button5" onClick={this.openModal}>
              Create service package <span class="glyphicon glyphicon-plus" />
            </button>
            <br />
            <Popup
              open={this.state.open}
              position="top center"
              modal
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              <div id="popup">
                <div id="sfHeader" style={{fontSize:"8px"}}>CREATE SERVICE PACKAGE </div>
                <div id="sfBody" style={{fontSize:"8px"}}>
                  <form id="sfForm">
                    Package name:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uName"
                      id="name"
                      placeholder="Enter package name..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Quota type:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uQuota"
                      id="quota_type"
                      placeholder="Enter quota type ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Active time:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uActTime"
                      id="active_time"
                      placeholder="Enter active time (hours) ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Inactive time:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uActTime"
                      id="inactive_time"
                      placeholder="Enter inactive time (hours) ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Active duration:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uDuration"
                      id="active_duration"
                      placeholder="Enter duration (days) ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Active days:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Monday"
                    />
                    Monday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Tuesday"
                    />
                    Tuesday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Wednesday"
                    />
                    Wednesday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Thursday"
                    />
                    Thursday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <br />
                    <br />
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Friday"
                    />
                    Friday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Saturday"
                    />
                    Saturday
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="checkbox"
                      class="days"
                      name="active_days_in_weeks"
                      id="days"
                      value="Sunday"
                    />
                    Sunday
                    <br />
                    <br />
                    Start date:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="date"
                      id="start_date"
                      name="start_date"
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    End date:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="date"
                      id="end_date"
                      name="end_date"
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Registration start date:<span>&nbsp;</span>
                    <input
                      type="date"
                      id="start_register_date"
                      name="start_register_date"
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Registration end date: <span>&nbsp;</span>
                    <input
                      type="date"
                      id="end_register_date"
                      name="end_register_date"
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Apply list:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="list"
                      id="list"
                      value="Productions"
                      onChange={this.handleChange}
                    />
                    Productions
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="list"
                      id="list"
                      value="Served Objects"
                      onChange={this.handleChange}
                    />
                    Served Objects
                    <br />
                    <br />
                    Import list:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input type="file" id="inputFile" />
                    <br />
                    <br />
                    <div class="buttonHolder">
                      <input
                        type="button"
                        value="CREATE"
                        onClick={this.handleSubmit}
                      />
                      <input
                        type="button"
                        value="ABORT"
                        onClick={this.closeModal}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Popup>
            <div>
              <table id="table1">
                <tr id="category">
                  <th>Package Name</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Start day</th>
                  <th>Action</th>
                </tr>
                {Table()}
              </table>
            </div>
            <div class="pagination">{Paginate_element()}</div>
          </div>
        </div>
      </div>
    );
  }
}
