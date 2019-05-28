import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import "../containers/UserDetail.css";
import Tab from "../subcontainers/Tab";

import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;
export default class ProviderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      email: "",
      gender: "",
      phone: "",
      date_of_birth: "",
      type: "",
      address: "",
      firm: "",
      status: "",
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
    if (localStorage.getItem("email") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/login");
    }
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    // const job=params.get('job');
    let link_api;
    // if(job=='Student'){
    // link_api="http://localhost:3000/users/detail?id="+id
    // }
    // else if(job=='Provider'){
    link_api = "http://localhost:3000/providers/detail?id=" + id;
    // }
    await fetch(link_api)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          name: data.result.name,
          email: data.result.email,
          gender: data.result.gender,
          phone: data.result.phone,
          date_of_birth: data.result.date_of_birth,
          type: data.result.type,
          address: data.result.address,
          firm: data.result.firm,
          status: data.result.status
        })
      );
    this.setState({ loading: false });
  }
  handleDelete = async event => {
    // alert(this.state.studentID)
    // alert(this.state.card_UID)
    event.preventDefault();
    const params = new URLSearchParams(this.props.location.search);
    const id = params.get("id"); // bar
    await fetch("http://localhost:3000/providers?id=" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status == 200) {
        alert("Delete account successfully!");
        this.setState({ open: false });
        this.props.history.push("/listprovider?page=1");

      } else {
        const error = new Error(res.error);
        throw error;
      }
    });
  };
  render() {
    return (
      <div>
        <SideMenu />
        <div id="leftside">
          <Tab title={["Accounts >> ", <b>Provider Detail</b>]} />

          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={"#36D7B7"}
            loading={this.state.loading}
          />
          <div
            id="cardinfo"
            style={{ visibility: this.state.loading ? "hidden" : "visible" }}
          >
            <b>
              PROVIDER <br />
              INFORMATION
            </b>
            <div id="bigline" />
            <div id="carddata" style={{ border: "none" }}>
              <div id="cardicon">
                <div id="imgicon">
                  <img
                    src="https://image.flaticon.com/icons/svg/992/992924.svg"
                    width="150px"
                    height="150px"
                  />
                </div>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <div>
                  <div>
                    <div id="datatab1">
                      Name:
                      <br />
                      <b>{this.state.name}</b>
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Address:
                      <br />
                      <b>{this.state.address}</b>
                      <br />
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab1">
                      Gender:
                      <br />
                      <b>{this.state.gender}</b>
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Email:
                      <br />
                      <b>{this.state.email}</b>
                      <br />
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab1">
                      Phone:
                      <br />
                      <b>{this.state.phone}</b>
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Firm:
                      <br />
                      <b>{this.state.firm}</b>
                      <br />
                    </div>
                  </div>
                  <br />
                </div>

                <br />
                <div id="holder">
                  <input
                    type="button"
                    id="button4"
                    class="carddetail"
                    value="Delete"
                    style={{ fontSize: "15px", width: "100px" }}
                    onClick={this.handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
