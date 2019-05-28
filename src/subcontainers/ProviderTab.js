import React, { Component } from "react";


class ProviderTab extends Component {

handleLogOut(){
    localStorage.removeItem("provider_id");

}
  render() {
    return (
        <div id="tab" style={{paddingTop:"20px",paddingRight:"20px"}} >
            <span style={{float:"left",display:"inline"}}>
              {" "}
              {/* Requests >> <b>Detail</b> */}
              {this.props.title}
            </span>
            <a href="/providers/login" style={{float:"right",display:"inline"}} class="btn btn-info btn-lg" onClick={this.handleLogOut}>
              <span class="glyphicon glyphicon-log-out"></span> Log out
            </a>
        </div>
    );
  }
}

export default ProviderTab;