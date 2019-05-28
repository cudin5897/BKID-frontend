import React, { Component } from "react";
import SideMenu from '../subcontainers/SideMenu';
import "../containers/Homepage.css";
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import Tab from "../subcontainers/Tab";

const override = `
    position:fixed;
    top:40%;
    left:50%;
`;

export default class Homepage extends Component {
    constructor(props){
        super(props);
        this.state={
            student_quantity:"",
            provider_quantity:"",
            service_quantity:"",
            station_quantity:"",
            loading:true
        }
    }
    async componentDidMount() {
        // alert( localStorage.getItem("email"));
        if(localStorage.getItem("email")==null){
            // alert("Wrong name or password");
            this.props.history.push("/login");
        }  
        
        await fetch("http://localhost:3000/users")
          .then(response => response.json())
          .then(data => this.setState({ student_quantity: data.length }));
          await  fetch("http://localhost:3000/stations")
          .then(response => response.json())
          .then(data => this.setState({ station_quantity: data.length }));
          await  fetch("http://localhost:3000/services")
          .then(response => response.json())
          .then(data => this.setState({ service_quantity: data.length }));
          await  fetch("http://localhost:3000/providers")
          .then(response => response.json())
          .then(data => this.setState({ provider_quantity: data.length }));
          this.setState({loading:false})
      }
      



    render() {
            return (
                <div>
                    <SideMenu />
                    <div id="leftside">                                            
                    <Tab title={"Dashboard"}/>

                        <ClipLoader
                            css={override}
                            sizeUnit={"px"}
                            size={100}
                            color={"#36D7B7"}
                            loading={this.state.loading}
                        />
                        {/* //content */}
                        {/* <div id="home_tab" style={{paddingTop:"20px",paddingRight:"20px"}} >
                            <span style={{float:"left",display:"inline"}}>
                            GENERAL DATA
                            </span>
                        </div> */}
                        <div id="content" style={{visibility: this.state.loading ? 'hidden' : 'visible' }}>
                            <div id="access_tab">
                                General data
                            </div>
                            <br/>
                            <div id="students" class="tab1" >
                                <img src="https://image.flaticon.com/icons/svg/1157/1157085.svg" width="100px" height="100px" />
                                <h1><b>Students</b></h1>
                                <h1 style={{paddingRight:'120px',textAlign:'right' }}>{this.state.student_quantity} </h1>
                            </div>
                            <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <div id="providers" class="tab1">
                                <img src="https://image.flaticon.com/icons/svg/992/992887.svg" width="100px" height="100px" />
                                <h1><b>Providers</b></h1>
                                <h1 style={{paddingRight:'110px',textAlign:'right' }}>{this.state.provider_quantity} </h1>
                            </div>
    
                            <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>

                            
                            <div id="services" class="tab2">
                                <img src="https://image.flaticon.com/icons/svg/490/490341.svg" width="100px" height="100px" />
                                <h1><b>Services</b></h1>
                                <h1 style={{paddingRight:'122px',textAlign:'right' }}>{this.state.service_quantity} </h1>
                            </div>
                            <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <div id="stations" class="tab2">
                                <img src="https://image.flaticon.com/icons/svg/1662/1662013.svg" width="100px" height="100px" />
                                <h1><b>Stations</b></h1>
                                <h1 style={{paddingRight:'128px',textAlign:'right' }}>{this.state.station_quantity} </h1>
                            </div>
                            
                            <br></br>
                            <br></br>
                            <div id="access_tab">
                                Quick access
                            </div>
                            <br/>
                            <Link to={"/listprovider?page=1"}>
                            <div id="personalInfo" class="tab3">
                                {/* <img src="https://image.flaticon.com/icons/svg/1625/1625539.svg" width="150px" height="150px" /> */}
                                <h3 id="bebas1"><b>Provider Account &nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" style={{float:"right"}}></span></b></h3>
                            </div>
                            </Link>                       
                            <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Link to={"/listuser?page=1"}>
                                <div id="accountManagement" class="tab5" href="/">
                                    {/* <img src="https://image.flaticon.com/icons/svg/236/236832.svg" width="150px" height="150px" /> */}
                                    <h3 id="bebas1"><b>User Account &nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" style={{float:"right"}}></span></b></h3>
                                </div>
                            </Link>
    
    
                            <br></br>
                            <br></br>
                            <Link to={"/card?page=1"}>
                                <div id="cardSystem" class="tab4">
                                    {/* <img src="https://image.flaticon.com/icons/svg/189/189085.svg" width="150px" height="150px" /> */}
                                    <h3 id="bebas1"><b>Card System &nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" style={{float:"right"}}></span></b></h3>
                                </div>                             
                            </Link>
                                                  <span> &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Link to={"/request"}>
                                <div id="requests" class="tab6">
                                    {/* <img src="https://image.flaticon.com/icons/svg/1332/1332049.svg" width="150px" height="150px" /> */}
                                    <h3 id="bebas1"><b>Requests &nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-log-in" style={{float:"right"}}></span></b></h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
    
            );
        

        
    }
}

