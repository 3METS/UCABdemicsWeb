import React, { Component } from "react";
import { Row, Col, Button, Typography } from "antd";
import Logo from "../img/UCABdemics-0,1x.png";
import "./styles/TopBarForm.css";

const { Text } = Typography;

export default class TopBarForm extends Component {
  state = {
    loginSelected: true,
  };

  handleLogin = () => {
    this.setState({
      loginSelected: true,
    });
    this.props.handleSelected("Login");
  };

  handleSign = () => {
    this.setState({
      loginSelected: false,
    });
    this.props.handleSelected("SignUp");
  };

  render() {
    return (
      <div style={{ paddingBottom: "6rem" }}>
        <Row justify="center" align="top">
          <Col span={6}>
            <img src={Logo} />
          </Col>
          <Col flex="auto"></Col>
          <Col span={7}>
            <Button type="text" block onClick={this.handleLogin}>
              <Text
                style={
                  this.state.loginSelected ? styles.selected : styles.normal
                }
              >
                Iniciar Sesión
              </Text>
            </Button>
          </Col>
          <Col span={6}>
            <Button type="text" block onClick={this.handleSign}>
              <Text
                style={
                  !this.state.loginSelected ? styles.selected : styles.normal
                }
              >
                Registrarse
              </Text>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  selected: {
    color: "#40B4E5",
    fontWeight: "bold",
    fontSize: 12,
  },
  normal: {
    color: "#828282",
    fontSize: 12,
  },
};
