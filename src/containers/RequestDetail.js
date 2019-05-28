import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import "./RequestDetail.css";
import Tab from "../subcontainers/Tab";
// const queryString = require('query-string');
import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;
export default class RequestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: "",
      content: "",
      status: "",
      priority: "",
      sender: "",
      received_date: "",
      sender: "",
      card_UID: "",
      studentID: "",
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
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  //handle change for select status only
  handleChangeforStatus = async event => {
    await this.setState({
      status: event.target.value
    });
  };

  handleSubmitStatus = async event => {
    event.preventDefault();
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch("http://localhost:3000/requests?id=" + id, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status == 200) {
        alert("Update request status successfully!");
        this.setState({ open: false });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    });
  };

  //handle delete
  handleDelete = async event => {
    // alert(this.state.studentID)
    // alert(this.state.card_UID)
    event.preventDefault();
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch("http://localhost:3000/requests?id=" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status == 200) {
        alert("Delete" + this.state.card_UID + "successfully!");
        this.setState({ open: false });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    });
  };

  //handle submit
  handleSubmit = async event => {
    // alert(this.state.studentID)
    // alert(this.state.card_UID)
    event.preventDefault();
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch(
      "http://localhost:3000/cards/update/UID/" +
        this.state.card_UID +
        "/userID/" +
        this.state.studentID +
        "?req_id=" +
        id,
      {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      if (res.status == 200) {
        alert("Update card" + this.state.card_UID + "successfully!");
        this.setState({ open: false });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    });
  };

  async componentDidMount() {
    // alert(localStorage.getItem("email"))
    if (localStorage.getItem("email") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/login");
    }
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch("http://localhost:3000/requests/detail?id=" + id)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          sender: data.result.sender,
          type: data.result.type,
          content: data.result.content,
          status: data.result.status,
          priority: data.result.priority,
          received_date: data.result.received_date,
          card_UID: data.result.card_UID
        })
      );
    this.setState({ loading: false });
  }

  render() {
    const createButton = () => {
      if (this.state.type == "Create") {
        return (
          <div id="holder">
            <input
              type="button"
              id="button1"
              class="carddetail"
              value="Submit"
              onClick={this.handleSubmit}
              style={{ fontSize: "15px", width: "100px" }}
            />
            <input
              type="button"
              id="button4"
              class="carddetail"
              value="Delete"
              style={{ fontSize: "15px", width: "100px" }}

              onClick={this.handleDelete}
            />
          </div>
        );
      } else {
        return (
          <div id="holder">
            <input
              type="button"
              id="button1"
              class="carddetail"
              value="Submit"
              onClick={this.handleSubmitStatus}
              style={{ fontSize: "15px", width: "100px" }}
            />
            <input
              type="button"
              id="button4"
              class="carddetail"
              value="Delete"
              onClick={this.handleDelete}
            />
          </div>
        );
      }
    };
    const EnterID = () => {
      if (this.state.type == "Create") {
        return (
          <div>
            <div id="datatab2">
              Enter Student ID: <br />
              <input
                type="text"
                name="student_id"
                id="studentID"
                onChange={this.handleChange}
                placeholder="Input here"
                style={{
                  borderRadius: "10px",
                  height: "50px",
                  width: "250px",
                  border: "1px solid black",
                  paddingLeft: "10px"
                }}
                onChange={this.handleChange}
              />
            </div>
          </div>
        );
      } else {
        return;
      }
    };
    return (
      <div>
        <SideMenu />
        <div id="leftside">
          <Tab title={["Requests >> ", <b>Detail</b>]} />
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#36D7B7"}
            loading={this.state.loading}
          />
          {/* //content */}
          <div
            id="cardinfo"
            style={{ visibility: this.state.loading ? "hidden" : "visible" }}
          >
            <b>
              {" "}
              REQUEST <br />
              INFORMATION
            </b>
            <br />
            <div id="carddata">
              <div id="cardicon">
                <div>
                  <div>
                    <div id="datatab1">
                      Sender:
                      <br />
                      <b>{this.state.sender}</b>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Type:
                      <br />
                      <b>{this.state.type}</b>
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab3">
                      Priority:
                      <br />
                      <b>{this.state.priority}</b>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab3">
                      Received day:
                      <br />
                      <b>{this.state.received_date}</b>
                    </div>

                    <span>&nbsp;&nbsp;</span>

                    <div id="datatab3">
                      Status: <span>&nbsp;&nbsp;</span>
                      <br />
                      <b>{this.state.status}</b>
                      <br />
                      <select
                        id="button5"
                        onChange={this.handleChangeforStatus}
                      >
                        <option value="" selected disabled hidden>
                          Change Status
                        </option>
                        <option value="New">New</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab2">
                      Content:
                      <br />
                      <b>{this.state.content}</b>
                    </div>
                  </div>

                  <br />
                  {EnterID()}
                </div>

                {createButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
