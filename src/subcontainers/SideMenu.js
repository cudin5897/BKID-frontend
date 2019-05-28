import React, { Component } from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";

let background_color="#467881"

class SideMenu extends Component {

    async componentDidMount(){
        var pathname = window.location.pathname.split( '/' );
        var path_id = pathname[1];
      
        
    }

    render() {
        return (
            <div id="sidebar">
                <ul>

                    <li>
                        <Link to={"/dashboard"} style={{ textDecoration: 'none' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/543px-Logo-hcmut.svg.png"
                                width="42" height="42" />
                        </Link>
                    </li>    
                    <Link to={"/dashboard"} style={{ textDecoration: 'none' }} onClick={this.handleChange}>
                        <li class="cate" style={{backgroundColor:window.location.pathname.split( '/' )[1]=="dashboard"?"#467881":"#445870" }} id="dashboard">Dashboard</li>
                    </Link>
                    <Link to={"/account"} style={{ textDecoration: 'none' }} onClick={this.handleChange}>
                        <li class="cate" style={{ backgroundColor:window.location.pathname.split( '/' )[1]=="account"?"#467881":"#445870"}}  id="account">Account Management</li>
                    </Link>
                    <Link to={"/card?page=1"} style={{ textDecoration: 'none' }} onClick={this.handleChange}>
                        <li class="cate" style={{ backgroundColor:window.location.pathname.split( '/' )[1]=="card"?"#467881":"#445870"}}  id="card">Card System</li>
                    </Link>
                    <Link to={"/request?page=1"} style={{ textDecoration: 'none' }} onClick={this.handleChange}>
                        <li class="cate"  style={{ backgroundColor:window.location.pathname.split( '/' )[1]=="request"?"#467881":"#445870"}} id="request">Requests</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default SideMenu;