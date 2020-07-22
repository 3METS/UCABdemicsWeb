import React, { Component } from "react";
import { Row, Button, Form, Input } from "antd";
import { MailFilled } from "@ant-design/icons";
import "./styles/LoginForm.css";

export default class SignUpForm extends Component {
  render() {
    return (
      <div>
        <Row>
          <h1>Registrarse</h1>
          <h4>Registrate para comenzar a usar nuestra aplicacion</h4>
        </Row>
        <Row>
          <Form
            style={{ width: "100%" }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                className="input"
                suffix={<MailFilled style={styles.colorSelected} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="input" />
            </Form.Item>
            <Form.Item
              name="repeatPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="input" />
            </Form.Item>
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
