import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import Popup from "reactjs-popup";
import "./ServiceDetail.css";
import { Link } from "react-router-dom";
import "./ServicePackageDetail.css";
import { ClipLoader } from "react-spinners";
import ProviderTab from "../subcontainers/ProviderTab";

const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

// import CreateUser from "./CreateUser";

export default class ServicePackageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      service_package_name: "",
      service_name: "",
      status: "",
      price: "",
      quota_type: "",
      service_type: "Free to use",
      start_time: "",
      end_time: "",
      start_register_date: "",
      end_register_date: "",
      active_duration: "",
      active_days_in_week: [],
      list_served_object: [],
      pages: "",
      page: 1,
      loading: true
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
  incHeight(number) {
    var el = document.getElementById("content");
    var height = el.offsetHeight;
    var newHeight = height + 30 * number;
    el.style.height = newHeight + "px";
  }

  async componentDidMount() {
    if (localStorage.getItem("provider_id") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/providers/login");
    }
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar

    await this.setState({ providerID: localStorage.getItem("provider_id") });
    await fetch("http://localhost:3000/services/servicepackage/detail?id=" + id)
      .then(async respone => await respone.json())
      .then(
        async data =>
          await this.setState({
            service_package_name: data.name,
            service_name: data.service_name,
            status: data.status,
            price: data.price,
            quota_type: data.quota_type,
            start_time: data.active_time,
            end_time: data.inactive_time,
            start_date: data.start_date,
            end_date: data.end_date,
            start_register_date: data.start_register_date,
            end_register_date: data.end_register_date,
            active_duration: data.active_duration,
            active_days_in_week: data.active_days_in_week,
            list_served_object: data.list_served_object
          })
      );
    await this.incHeight(this.state.list_served_object.length);
    await this.setState({ loading: false });
  }

  //HANDLE SUBMIT
  handleSubmit = async event => {};

  render() {
    const Table1 = () => {
      {
        // alert();
        let array_table = [];
        if (this.state.active_days_in_week != []) {
          this.state.active_days_in_week.map(item => {
            array_table.push(
              <span>
                -{item}
                <br />
              </span>
            );
          });
        }
        // alert(array_table);
        return array_table;
      }
    };
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.group}</td>
      </tr>
    );
    const Table = () => {
      {
        // alert();
        let array_table = [];
        if (this.state.list_served_object != []) {
          this.state.list_served_object.map(item => {
            array_table.push(
              <Table_cell
                id={item.id}
                name={item.obj_name}
                group={item.group}
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
          <ProviderTab title={"Service Package Detail"} />

          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#36D7B7"}
            loading={this.state.loading}
          />
          <div
            id="content"
            style={{
              visibility: this.state.loading ? "hidden" : "visible",
              paddingTop: "0px"
            }}
          >
            <div id="package_tab">
              <div id="package_data_tab">
                <b>
                  Service Package Name: <br />
                  <h4>{this.state.service_package_name}</h4>
                </b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab">
                <b>
                  Belong to service: <br />
                  <h4>{this.state.service_name}</h4>
                </b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab">
                <b>
                  Status: <br />
                  <h4>{this.state.status}</h4>
                </b>
              </div>
              {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <div id="package_data_tab5">
                                <b>Status: <br/><h4>Active</h4></b>
                            </div> */}
              <br />
              <div id="package_data_tab2">
                <b>
                  Price: <br />
                  <h4>{this.state.price}</h4>
                </b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab2">
                <b>
                  Quota type: <br />
                  <h4>{this.state.quota_type}</h4>
                </b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab2">
                <b>
                  Service type: <br />
                  <h4>Free to use</h4>
                </b>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab3">
                <b>
                  Activated time in day: <br />
                  <h4>
                    From {this.state.start_time} to {this.state.end_time}
                  </h4>
                </b>
              </div>
              <br />
              <div id="package_data_tab4">
                <b>Activated period:</b> <br />
                <h4>
                  from: <b>{this.state.start_date}</b>
                  <br /> to:<b>{this.state.end_date}</b>
                </h4>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab4">
                <b>Allowed register period:</b> <br />
                <h4>
                  {" "}
                  from: <b>{this.state.start_register_date}</b>
                  <br /> to: <b>{this.state.end_register_date}</b>
                </h4>
              </div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div id="package_data_tab2">
                <b>
                  Duration: <br />
                  <h4>
                    {" "}
                    {this.state.active_duration} days
                    <br />
                    <br />
                  </h4>
                </b>
              </div>
            </div>

            <div id="package_tab2">
              <b>Active in:</b>
              <br />
              {/* - Monday
                                <br/>
                                - Friday
                                <br/>
                                - Wednesday
                                <br/>
                                - Monday
                                <br/>
                                - Friday
                                <br/>
                                - Saturday
                                <br/>
                                - Saturday
                                <br/> */}
              {Table1()}
            </div>

            <div>
              <div
                style={{
                  backgroundColor: "white",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "5px"
                }}
              >
                <h4>
                  <b>List of students</b>
                </h4>
                <table id="table1">
                  <tr id="category">
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Group</th>
                  </tr>
                  {Table()}
                </table>
              </div>
            </div>
            <div class="pagination">{Paginate_element()}</div>
          </div>
        </div>
      </div>
    );
  }
}
