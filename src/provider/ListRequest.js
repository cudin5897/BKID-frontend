import React, { Component } from "react";
import ProviderSideMenu from "../subcontainers/ProviderSideMenu";
import Popup from "reactjs-popup";
import ProviderTab from "../subcontainers/ProviderTab";

// import CreateUser from "./CreateUser";

export default class ListRequest extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
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
  }

  render() {
    return (
      <div>
        <ProviderSideMenu />
        <div id="leftside">
          <ProviderTab title={"List Request"} />

          <div id="content">
            <input
              type="button"
              id="Create_new"
              value="New service"
              onClick={this.openModal}
            />
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
                    name="sName"
                    placeholder="Enter service name..."
                  />
                  <br />
                  <br />
                  Service type:
                  <select name="sType">
                    <option value="Paid">Paid</option>
                    <option value="Free">Free</option>
                  </select>
                  <br />
                  <br />
                  <br />
                  Service status:
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round" />
                  </label>
                  <br />
                  <br />
                  <br />
                  Check in/out:
                  <input type="radio" name="inout" value="Yes" checked /> Yes
                  <input type="radio" name="inout" value="No" /> No
                  <br />
                  <br />
                  <br />
                  Description: <br />
                  <br />
                  <textarea
                    rows="6"
                    cols="44"
                    placeholder="Type here description about your service..."
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
                  <th>ID</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Service 1</td>
                  <td>10</td>
                  <td>
                    <button class="button button3">Edit</button>
                    <button class="button button2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Service 2</td>
                  <td>10</td>
                  <td>
                    <button class="button button3">Edit</button>
                    <button class="button button2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Service 3</td>
                  <td>10</td>
                  <td>
                    <button class="button button3">Edit</button>
                    <button class="button button2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Service 4</td>
                  <td>10</td>
                  <td>
                    <button class="button button3">Edit</button>
                    <button class="button button2">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Service 5</td>
                  <td>10</td>
                  <td>
                    <button class="button button3">Edit</button>
                    <button class="button button2">Delete</button>
                  </td>
                </tr>
              </table>
            </div>
            <div class="pagination">
              <a href="#">&laquo;</a> <a href="#">1</a>
              <a class="active" href="#">
                2
              </a>{" "}
              <a href="#">3</a> <a href="#">4</a>
              <a href="#">5</a> <a href="#">6</a> <a href="#">&raquo;</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
