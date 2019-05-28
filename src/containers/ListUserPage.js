import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import "../containers/ListUserPage.css";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import Tab from "../subcontainers/Tab";
import readXlsxFile from "read-excel-file";

import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

export default class ListUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      studentID: "",
      name: "",
      email: "",
      password: "",
      gender: "",
      job: "",
      phone: "",
      date_of_birth: "",
      address: "",
      type: "Regular",
      firm: "BKU",
      password: "12345",
      list_student: [],
      pages: "",
      page: 1,
      list_create_student: [],
      loading: true
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openModal1 = this.openModal1.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
  }

  handleChange = event => {
    // alert([event.target.id])
    this.setState({
      [event.target.id]: event.target.value
    });
    // alert([event.target.id])
    // alert(event.target.value);
  };

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  openModal1() {
    this.setState({ open1: true });
  }
  closeModal1() {
    this.setState({ open1: false });
  }
  handleSubmit = async event => {
    let create_api;
    if (this.state.job == "Provider") {
      create_api = "http://localhost:3000/providers/create";
    } else {
      create_api = "http://localhost:3000/users/create";
    }

    event.preventDefault();
    await fetch(create_api, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          alert("Create successfully!");
          this.setState({ open: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Cannot create new user");
      });
  };
  // GET DATA FROM EXCEL FILE
  handleImportFile = async event => {
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
          name: item[0],
          studentID: item[1],
          email: item[2],
          gender: item[3],
          phone: item[4],
          date_of_birth: item[5],
          address: item[6],
          firm: item[7],
          job: item[8]
        });
      });
    });
    await this.setState({
      list_create_student: list_object
    });

    event.preventDefault();
    await fetch("http://localhost:3000/users/createmany", {
      method: "POST",
      body: JSON.stringify(this.state.list_create_student),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status == 200) {
          alert("Create successfully!");
          this.setState({ open1: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Cannot create new user");
      });
  };

  async componentDidMount() {
    if (localStorage.getItem("email") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/login");
    }
    const params = new URLSearchParams(this.props.location.search);
    const page = params.get("page"); // bar
    await fetch("http://localhost:3000/users/liststudent?page=" + page)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          page: page,
          list_student: data.docs,
          pages: data.pages
        })
      );
    this.setState({ loading: false });
  }

  render() {
    const Table_cell = data => (
      <tr>
        <td>{data.studentID}</td>
        <td>{data.name}</td>
        <td>{data.service.name}</td>
        <td>{data.phone}</td>
        <td>{data.status}</td>
        <td>
          <Link to={"/user/detail?id=" + data.id}>
            <button class="button button2">
              View &nbsp;&nbsp;&nbsp;
              <span class="glyphicon glyphicon-log-in" />
            </button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        let array_table = [];

        if (this.state.list_student != []) {
          this.state.list_student.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                name={item.name}
                service={""}
                studentID={item.studentID}
                phone={item.phone}
                status={item.status}
              />
            );
          });
        }
        return array_table;
      }
    };
    const Paginate_element = () => {
      let paginate_array = [<a href="#">&laquo;</a>];
      if (this.state.pages != "") {
        for (var i = 1; i <= this.state.pages; i++) {
          if (this.state.page == i) {
            paginate_array.push(
              <a
                class="active"
                href={"http://localhost:3001/listuser?page=" + i}
              >
                {i}
              </a>
            );
          } else {
            paginate_array.push(
              <a href={"http://localhost:3001/listuser?page=" + i}>{i}</a>
            );
          }
        }
      }
      paginate_array.push(<a href="#">&raquo;</a>);
      return paginate_array;
    };
    return (
      <div>
        <SideMenu />
        <div id="leftside">
          <Tab title={"List User"} />

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
            <button class="button button5" onClick={this.openModal}>
              New User &nbsp;&nbsp;
              <span class="glyphicon glyphicon-plus" />
            </button>

            <button class="button button5" onClick={this.openModal1}>
              Quick Import &nbsp;&nbsp;
              <span class="glyphicon glyphicon-import" />
            </button>

            <Popup
              open={this.state.open}
              modal
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              <div id="modal_form" style={{ paddingTop: "0px" }}>
                <div id="sfHeader">
                  <b>Create New User</b>{" "}
                  <a className="close" onClick={this.closeModal}>
                    &times;
                  </a>
                </div>

                <div id="sfBody">
                  <form id="sfForm">
                    Username:<span>&nbsp;&nbsp;&nbsp;</span>
                    <input
                      type="text"
                      name="uName"
                      id="name"
                      placeholder="Enter username..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Email:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="email"
                      name="uEmail"
                      id="email"
                      placeholder="Enter email ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    ID:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uID"
                      id="studentID"
                      placeholder="Enter id ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Firm:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uFirm"
                      id="firm"
                      placeholder="Enter firm ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Gender:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Male"
                      onChange={this.handleChange}
                    />
                    Male
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Female"
                      onChange={this.handleChange}
                    />
                    Female
                    <br />
                    <br />
                    Phone:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="text"
                      name="uPhone"
                      id="phone"
                      placeholder="Enter phone number ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Date of birth:
                    <input
                      type="date"
                      id="date_of_birth"
                      name="uDate"
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Address: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input
                      type="text"
                      id="address"
                      name="uAddress"
                      placeholder="Enter address ..."
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    Job:
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="job"
                      value="Teacher"
                      id="job"
                      onChange={this.handleChange}
                    />
                    Teacher
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="job"
                      value="Student"
                      id="job"
                      onChange={this.handleChange}
                    />
                    Student
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <input
                      type="radio"
                      name="job"
                      value="Provider"
                      id="job"
                      onChange={this.handleChange}
                    />
                    Provider
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

            <Popup
              open={this.state.open1}
              modal
              closeOnDocumentClick
              onClose={this.closeModal1}
            >
              <a className="close" onClick={this.closeModal1}>
                &times;
              </a>
              <div id="sfHeader">
                <b>
                  Import List User
                  <br />
                </b>
                (quickly create account based on excel data file)
              </div>
              <br />
              <div id="sfBody">
                <form id="sfForm">
                  The file excel column must be in format (id, name, email,
                  gender, phone, date_of_birth, address, firm, status, password,
                  job):
                  <br />
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <input type="file" id="inputFile" />
                  <div class="buttonHolder">
                      <input
                        type="button"
                        value="SUBMIT"
                        onClick={this.handleImportFile}
                      />
                      <input
                        type="button"
                        value="ABORT"
                        onClick={this.closeModal1}
                      />
                    </div>
                </form>
              </div>
            </Popup>

            <br />
            <br />
            <div>
              <table id="table1">
                <tr id="category">
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Using service</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {/* <Table_cell data={this.state.list_student[0]}/> */}
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
