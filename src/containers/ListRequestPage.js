import React, { Component } from "react";
import SideMenu from "../subcontainers/SideMenu";
import { Link } from "react-router-dom";
import CustomScroll from "react-custom-scroll";
import { ClipLoader } from "react-spinners";
import Tab from "../subcontainers/Tab";

const override = `
    position:fixed;
    top:40%;
    left:50%;
`;
export default class ListRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list_request: [],
      pages: "",
      page: 1,
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
    await fetch("http://localhost:3000/requests/listrequest?page=" + page)
      .then(respone => respone.json())
      .then(data =>
        this.setState({
          page: page,
          list_request: data.docs,
          pages: data.pages
        })
      );
    this.setState({ loading: false });
  }

  render() {
    const Table_cell = data => (
      <tr>
        {/* <td>{data.studentID}</td> */}
        <td>{data.type}</td>
        <td>{data.status}</td>
        <td>{data.priority}</td>
        <td>{data.sender}</td>
        <td>
          <Link to={"/request/detail?id=" + data.id}>
            <button class="button button2">View  &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" ></span></button>
          </Link>
        </td>
      </tr>
    );
    const Table = () => {
      {
        let array_table = [];

        if (this.state.list_request != []) {
          this.state.list_request.map(item => {
            array_table.push(
              <Table_cell
                id={item._id}
                type={item.type}
                status={item.status}
                priority={item.priority}
                sender={item.sender}
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
                href={"http://localhost:3001/request?page=" + i}
              >
                {i}
              </a>
            );
          } else {
            paginate_array.push(
              <a href={"http://localhost:3001/request?page=" + i}>{i}</a>
            );
          }
        }
      }
      paginate_array.push(<a href="#">&raquo;</a>);
      return paginate_array;
    };
    return (
      <div>
        <CustomScroll>
          <SideMenu />

          <div id="leftside">
            <Tab title={"List Request"} />

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
              <br />

              <div>
                <table id="table1">
                  <tr id="category">
                    <th>Type</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Sender</th>
                    <th>Action</th>
                  </tr>
                  {Table()}
                </table>
              </div>
              <div class="pagination">{Paginate_element()}</div>
            </div>
          </div>
        </CustomScroll>
      </div>
    );
  }
}
