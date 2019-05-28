import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import "../containers/CardDetail.css";
import Tab from "../subcontainers/Tab";
import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;
export default class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_number: "",
      status: "",
      userID: "",
      created_date: "",
      expired_date: "",
      loading: true
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("email") == null) {
      // alert("Wrong name or password");
      this.props.history.push("/login");
    }
    // alert()
    const params = new URLSearchParams(this.props.location.search);
    const id = await params.get("id"); // bar
    await fetch("http://localhost:3000/cards/detail?id=" + id)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          card_number: data.card_number,
          userID: data.userID,
          created_date: data.created_date,
          status: data.status
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
    await fetch("http://localhost:3000/cards?id=" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status == 200) {
        alert("Delete account successfully!");
        this.setState({ open: false });
        this.props.history.push("/card?page=1");
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
          <Tab title={[" Card System >> ", <b>Card detail</b>]} />

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
            CARD <br />
            INFORMATION
            <div id="carddata">
              <div id="cardicon">
                <span>&nbsp;&nbsp;&nbsp;</span>
                <div>
                  <div>
                    <div id="datatab1">
                      Name:
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Student ID:
                      <br />
                      <b>{this.state.userID}</b>
                      <br />
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab1">
                      Card Number:
                      <br />
                      <b>{this.state.card_number}</b>
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Status:
                      <br />
                      <b>{this.state.status}</b>
                      <br />
                    </div>
                  </div>
                  <br />
                  <div>
                    <div id="datatab1">
                      Created day:
                      <br />
                      <b>{this.state.created_date}</b>
                      <br />
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div id="datatab1">
                      Expired day:
                      <br />
                      <b>{this.state.expired_date}</b>
                      <br />
                    </div>
                  </div>
                </div>
                <br />

                <br />
                <br />
                <div id="holder">
                  <input
                    type="button"
                    id="button1"
                    class="carddetail"
                    value={"To User Info >>"}
                    style={{ fontSize: "15px", width: "200px" }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
