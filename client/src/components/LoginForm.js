import React, { Component } from "react";
import { Row, Col, Form, Button, Checkbox, Input } from "antd";
import { MailFilled } from "@ant-design/icons";
import "./styles/LoginForm.css";

export default class LoginForm extends Component {
  state = {
    emailValue: "",
    passValue: "",
  };

  handleEmailChange = (e) => {
    this.setState({
      emailValue: e.target.value,
    });
  };

  handlePassChange = (e) => {
    this.setState({
      passValue: e.target.value,
    });
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Row>
          <h1>Iniciar Sesión</h1>
          <h4>Inicie sesión para continuar a nuestra aplicación</h4>
        </Row>
        <Row>
          <Form
            style={{ width: "100%" }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Ingrese su correo electrónico",
                },
              ]}
            >
              <Input
                placeholder="Correo Electrónico"
                className="input"
                suffix={<MailFilled style={styles.colorSelected} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Ingrese su contraseña",
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" className="input" />
            </Form.Item>

            <Row>
              <Col span={12}>
                <Form.Item name="remember" valuePropName="unchecked">
                  <Checkbox style={styles.font}>Recuérdame</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button block type="text" style={styles.forgotButton}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </Col>
            </Row>

            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                block
                className="submitButton"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row></Row>
      </div>
    );
  }
}

const styles = {
  input: {
    marginTop: "2.5rem",
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    fontSize: 14,
    color: "#40C4E5",
  },
  submitButton: {
    borderRadius: 15,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    background:
      "linear-gradient(90deg, rgba(64,180,229,1) 17%, rgba(6,196,82,1) 68%)",
  },
  colorSelected: {
    color: "#40C4E5",
  },
  colorNormal: {
    color: "#828282",
  },
  font: {
    fontSize: 13,
  },
  forgotButton: {
    color: "#047732",
    fontWeight: "bold",
    fontSize: 13,
  },
};
