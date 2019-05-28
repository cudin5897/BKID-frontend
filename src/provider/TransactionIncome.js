import React, { Component } from "react";
import ProviderSideMenu from '../subcontainers/ProviderSideMenu';
import './TransactionIncome.css';
import { Link } from "react-router-dom";


// import CreateUser from "./CreateUser";

export default class TransactionIncome extends Component {
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
                        <button class="sTab" id="Income">Income</button>
                     </Link>
                     <Link to={"/providers/transaction/history"}>
                        <button class="sTab" id="History">History</button>
                     </Link>
                    </div>
                    <div>
                        <table id="table1">
                            <tr id="category">
                                <th>ID</th>
                                <th>Package Name</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Package 1</td>
                                <td>17/01/2019</td>
                                <td>17/05/2019</td>
                                <td>30 days</td>
                                <td>10</td>
                                <td>
                                    <button class="button button3">Edit</button>
                                    <button class="button button2">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Package 2</td>
                                <td>17/01/2019</td>
                                <td>17/05/2019</td>
                                <td>30 days</td>
                                <td>10</td>
                                <td>
                                    <button class="button button3">Edit</button>
                                    <button class="button button2">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Package 3</td>
                                <td>17/01/2019</td>
                                <td>17/05/2019</td>
                                <td>30 days</td>
                                <td>10</td>
                                <td>
                                    <button class="button button3">Edit</button>
                                    <button class="button button2">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Package 4</td>
                                <td>17/01/2019</td>
                                <td>17/05/2019</td>
                                <td>30 days</td>
                                <td>10</td>
                                <td>
                                    <button class="button button3">Edit</button>
                                    <button class="button button2">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Package 5</td>
                                <td>17/01/2019</td>
                                <td>17/05/2019</td>
                                <td>30 days</td>
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
                        <a class="active" href="#">2</a> <a href="#">3</a> <a href="#">4</a>
                        <a href="#">5</a> <a href="#">6</a> <a href="#">&raquo;</a>
                    </div>
                </div>
            </div>
                    </div>
            
        );
    }
}

