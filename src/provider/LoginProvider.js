import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from "../subcontainers/NavBar";

export default class LoginProvider extends Component {
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
    await fetch("http://localhost:3000/providers/login", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data._id === null) {
          alert("Wrong username or password");
        } else {
          localStorage.setItem("provider_id", data._id);
          this.props.history.push("/providers/dashboard");
        }
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
            position: "fixed",
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
              style={{ backgroundColor: "#31b0d5" }}
            >
              Log in as provider administrator
            </Button>
          </form>
          <br/>
          <br/>
          <div style={{ textAlign: "center", fontSize: "14px" }}>
            <a href="/login">Log in as system administrator?</a>
          </div>
        </div>
      </div>
    );
  }
}
