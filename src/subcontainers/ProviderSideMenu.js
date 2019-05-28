import React, { Component } from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";


class ProviderSideMenu extends Component {
    async componentDidMount(){
        var pathname = window.location.pathname.split( '/' );
        var path_id = pathname[1];
      
        
    }
    render() {
        return (
            <div id="sidebar">
                <ul>

                    <li>
                        <Link to={"/providers/dashboard"} style={{ textDecoration: 'none' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/543px-Logo-hcmut.svg.png"
                                width="42" height="42" />
                        </Link>
                    </li>
                    <Link to={"/providers/dashboard"} style={{ textDecoration: 'none' }}>
                    <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[2]=="dashboard"?"#467881":"#445870" }}>Dashboard</li>
                     </Link>
                   
                    <Link to={"/providers/listservice?page=1"} style={{ textDecoration: 'none' }}>
                        <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[2]=="listservice"?"#467881":"#445870" }}>Service Management</li>
                    </Link>
                    {/* <Link to={"/providers/transaction/income"} style={{ textDecoration: 'none' }}>
                    <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[2]=="transaction"?"#467881":"#445870" }}>Transactions</li>
                     </Link> */}
                    <Link to={"/providers/liststation"} style={{ textDecoration: 'none' }}>
                    <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[2]=="liststation"?"#467881":"#445870" }}>Stations Management</li>
                     </Link>
                     {/* <Link to={"/providers/listrequest"} style={{ textDecoration: 'none' }}>
                     <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[2]=="listrequest"?"#467881":"#445870" }}>Requests</li>
                     </Link> */}
                </ul>
            </div>
        );
    }
}

export default ProviderSideMenu;