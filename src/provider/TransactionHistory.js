import React, { Component } from "react";
import ProviderSideMenu from '../subcontainers/ProviderSideMenu';
import './TransactionHistory.css';
import CanvasJSReact from '../canvasjs.react';
import { Link } from "react-router-dom";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


// import CreateUser from "./CreateUser";

export default class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

    }
    openModal() {
        this.setState({ open: true })
    }
    closeModal() {
        this.setState({ open: false })
    }
    async componentDidMount(){
        if(localStorage.getItem("provider_id")==null){
            // alert("Wrong name or password");
            this.props.history.push("/providers/login");
        }  
    }

    render() {
        const options = {
            width: 400,
            title: {
                text: "Income"
            },
            axisY: {
                title: "Points"
            },
            axisX: {
                title: "Stations"
            },
            data: [
                {
                    dataPoints: [
                        { x: 1, y: 100 },
                        { x: 2, y: 200 },
                        { x: 3, y: 300 },
                        { x: 4, y: 400 },
                        { x: 5, y: 500 },
                        { x: 6, y: 600 },
                        { x: 7, y: 80 },
                        { x: 8, y: 200 },
                        { x: 9, y: 300 }
                    ]
                }
            ]
        }
                return (
                    <div>                
                        <ProviderSideMenu />
                        <div id="leftside">
                <div id="tab">
                    <h2>TRANSACTION</h2>
                </div>
                <div id="content">
                    <div id="sTab">
                    <Link to={"/providers/transaction/income"}>
                        <button class="sTab1" id="Income">Income</button>
                     </Link>
                     <Link to={"/providers/transaction/history"}>
                        <button class="sTab1" id="History">History</button>
                     </Link>
                    </div>
                    <div>
                        <div id="stationData">
                            <h4>Total Income: 300000</h4>   
                            <div id="totalChart">
                                <CanvasJSChart options={options} />
                            </div>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <div id="anotherInfo1">
                                From:
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input type="date" id="from_date" name="from_date"  onChange={this.handleChange}></input>
                                <br></br><br></br>
                                To:
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input type="date" id="to_date" name="to_date"  onChange={this.handleChange}></input>
                            </div>


                        </div>  
                    </div>
                  
                        </div>
                    </div>
                </div>
            
        );
    }
}

