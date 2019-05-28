import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import "../containers/CardSystem.css";
import { Link } from "react-router-dom";
import Tab from "../subcontainers/Tab";

import { ClipLoader } from "react-spinners";
const override = `
    position:fixed;
    top:40%;
    left:50%;
`;
export default class CardSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list_card: [],
      pages: "",
      page: "",
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
    const page = params.get("page"); // bar
    await fetch("http://localhost:3000/cards/listcard?page=" + page)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          page: page,
          list_card: data.docs,
          pages: data.pages
        })
      );
    this.setState({ loading: false });
  }

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.card_number}</td>
        <td>{data.status}</td>
        <td>{data.userID}</td>
        <td>
          <Link to={"/cards/detail?id=" + data.id}>
            <button class="button button2">View  &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" ></span></button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        let array_table = [];

        if (this.state.list_card != []) {
          this.state.list_card.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                card_number={item.card_number}
                userID={item.userID}
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
              <a class="active" href={"http://localhost:3001/card?page=" + i}>
                {i}
              </a>
            );
          } else {
            paginate_array.push(
              <a href={"http://localhost:3001/card?page=" + i}>{i}</a>
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
          <Tab title={"Card System"} />

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
            {/* <input type="button" id="View_info" value="View info"></input>
                        <input type="button" id="Lock_card" value="Lock card"></input> */}

            <br />
            <br />

            <div>
              <table id="table1">
                <tr id="category">
                  <th>Card number</th>
                  <th>Status</th>
                  <th>User ID</th>
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
