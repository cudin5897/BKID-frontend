import React, { Component } from "react";
import "../containers/CreateUser.css"

export default class CreateUser extends Component {
    render() {
        return (
            <div>
                    <div id="sfBody">
                        <form id="sfForm">
                            Username:<span>&nbsp;&nbsp;</span>
                            <input type="text" name="uName" placeholder="Enter username..."></input>
                            <br></br><br></br>
                            Email:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="email" name="uEmail" placeholder="Enter email ..." ></input>
                            <br></br><br></br>

                            Gender:
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="radio" name="gender" value="male" ></input>Male
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="radio" name="gender" value="female"></input>Female
                            <br></br><br></br>

                            Phone:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="text" name="uPhone" placeholder="Enter phone number ..." ></input>
                            <br></br><br></br>

                            Date of birth:
                            <input type="date" name="uDate"  ></input>
                            <br></br><br></br>

                            Address:   <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>         
                            <input type="text" name="uAddress" placeholder="Enter address ..." ></input>
                            <br></br><br></br>

                            Job:
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="radio" name="job" value="teacher" ></input>Teacher
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input type="radio" name="job" value="student"></input>Student
                            <br></br><br></br>
                            <div class="buttonHolder">
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}

