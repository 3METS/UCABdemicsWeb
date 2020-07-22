import React, { Component } from "react";
import { Row, Col } from "antd";
import TopBarForm from "../components/TopBarForm";
import ImageViewer from "../components/ImageViewer";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import "./styles/LoginSignUp.css";

export default class LoginSignUp extends Component {
  state = {
    loginSelected: true,
  };

  handleSelected = (name) => {
    this.setState({
      loginSelected: name === "Login" ? true : false,
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={10} style={{ padding: "5rem" }}>
            <TopBarForm handleSelected={this.handleSelected} />
            {this.state.loginSelected ? <LoginForm /> : <SignUpForm />}
          </Col>
          <Col span={14}>
            <ImageViewer />
          </Col>
        </Row>
      </div>
    );
  }
}
