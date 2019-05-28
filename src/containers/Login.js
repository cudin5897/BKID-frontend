import React, { Component, useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import NavBar from "../subcontainers/NavBar";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await fetch("http://localhost:3000/adminusers/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // alert(res);
        if (res.status === 200) {
          localStorage.setItem("email", this.state.email);
          // localStorage.removeItem("email");

          this.props.history.push("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        // console.error(err);
        alert("Error logging in please try again");
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div
          className="Login"
          style={{
            width: "100%",
            height: "100%",
            top: "50px",
            position: "fixed"
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <h5>Email</h5>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <h5>Password</h5>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              style={{ backgroundColor: "#31b0d5"}}
            >
              Log in as system administrator
            </Button>
          </form>
          <br />
          <br />
          <div               style={{ textAlign: "center", fontSize: "14px" }}
>
            <a
              href="/providers/login"
            >
              Log in as provider administrator?
            </a>
          </div>
        </div>
      </div>
    );
  }
}
