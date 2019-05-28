import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import ProviderTab from "../subcontainers/ProviderTab";

import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

export default class ListService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      type: "",
      hasCheckinout: true,
      providerID: "",
      description: "",
      page: 1,
      pages: "",
      list_service: [],
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
  async componentDidMount() {
    if (localStorage.getItem("provider_id") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/providers/login");
    }
    await this.setState({ providerID: localStorage.getItem("provider_id") });
    const params = new URLSearchParams(this.props.location.search);
    const page = params.get("page"); // bar
    await fetch(
      "http://localhost:3000/services/listservice?page=" +
        page +
        "&providerid=" +
        this.state.providerID
    )
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          page: page,
          list_service: data.docs,
          pages: data.pages
        })
      );
    this.setState({ loading: false });
  }
  //HANDLE SUBMIT
  handleSubmit = async event => {
    let inout = await document.querySelector('input[name="inout"]:checked')
      .value;
    await this.setState({
      hasCheckinout: inout
    });
    // alert(this.state.hasCheckinout);
    event.preventDefault();
    await fetch("http://localhost:3000/services/create", {
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
        alert("Service had not been created yet");
      });
  };

  // CHUA CO HANDLE CHANGE

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.name}</td>
        <td>{data.hasCheckinout == true ? "Yes" : "No"}</td>
        <td>{data.status}</td>
        <td>
          <Link to={"/providers/servicedetail?id=" + data.id}>
            <button class="button button2">View  &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" ></span></button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        let array_table = [];

        if (this.state.list_service != []) {
          this.state.list_service.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                name={item.name}
                hasCheckinout={item.hasCheckinout}
                status={item.status}
              />
            );
          });
        }
        return array_table;
      }
    };
    const Paginate_element = () => {
      let paginate_array = [
        // <a href="#">&laquo;</a>
      ];
      if (this.state.pages != "") {
        for (var i = 1; i <= this.state.pages; i++) {
          if (this.state.page == i) {
            paginate_array.push(
              <a
                class="active"
                href={"http://localhost:3001/providers/listservice?page=" + i}
              >
                {i}
              </a>
            );
          } else {
            paginate_array.push(
              <a href={"http://localhost:3001/providers/listservice?page=" + i}>
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
          <ProviderTab title={"List Service"} />

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
            <div id="create_service" display={{textAlign:"center",width: "170px"}} onClick={this.openModal}>
                New Service<span>&nbsp;&nbsp;&nbsp;</span>
                <span class="glyphicon glyphicon-plus" ></span>
              </div>
            <Popup
              open={this.state.open}
              modal
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              <a className="close" onClick={this.closeModal}>
                &times;
              </a>
              <div id="sfHeader">CREATE SERVICE </div>
              <div id="sfBody">
                <form id="sfForm">
                  Service name:{" "}
                  <input
                    type="text"
                    id="name"
                    name="sName"
                    placeholder="Enter service name..."
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  Service type:
                  <select id="type" name="sType" onChange={this.handleChange}>
                    <option value="Paid">Paid</option>
                    <option value="Free">Free</option>
                  </select>
                  <br />
                  <br />
                  <br />
                  Check in/out:
                  <input type="radio" name="inout" value="true" /> Yes
                  <input type="radio" name="inout" value="false" /> No <br />
                  <br />
                  <br />
                  Description: <br />
                  <br />
                  <textarea
                    id="description"
                    rows="6"
                    cols="44"
                    placeholder="Type here description about your service..."
                    onChange={this.handleChange}
                    style={{paddingLeft:"19px",paddingTop:"10px"}}
                  />
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
                  </div>{" "}
                  <br />
                  <br />
                  <br />
                </form>
              </div>
            </Popup>
            <div>
              <table id="table1">
                <tr id="category">
                  <th>Service name</th>
                  <th>In/out service</th>
                  <th>Status</th>
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
