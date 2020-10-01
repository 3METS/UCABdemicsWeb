import React, { useState } from "react";
import { FlexboxGrid, Carousel, Container, Header, Button } from "rsuite";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Login from "../assets/images/login.png";
import SignUp from "../assets/images/signUp.png";
import Logo from "../assets/images/logo.png";

import "../styles/LoginSignUp.css";

export default function LoginSignUpPage() {
  const [selectedItem, setSelectedItem] = useState("Login");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
    verifyPassword: "",
  });

  function handleSubmit(e, form) {
    e.preventDefault();
    if (!form.check()) {
      console.error("Form Error");
      return;
    }
    console.log(formValue, "Form Value");
  }

  function selectLogin() {
    setSelectedItem("Login");
  }

  function selectSignUp() {
    setSelectedItem("SignUp");
  }

  return (
    <>
      <FlexboxGrid fluid className="App">
        <FlexboxGrid.Item colspan={10} className="form">
          <Container className="full-h">
            <Header className="header full-w">
              <FlexboxGrid fluid>
                <FlexboxGrid.Item colspan={8}>
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ height: "3rem", width: "100%" }}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                  <Button appearance="link" onClick={selectLogin}>
                    <p
                      className={`split-button-text ${
                        selectedItem === "Login"
                          ? "selected-button"
                          : "unselected-button"
                      }`}
                    >
                      Iniciar Sesión
                    </p>
                  </Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                  <Button appearance="link" onClick={selectSignUp}>
                    <p
                      className={`split-button-text ${
                        selectedItem === "SignUp"
                          ? "selected-button"
                          : "unselected-button"
                      }`}
                    >
                      Registrarse
                    </p>
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Header>
            {selectedItem === "Login" ? (
              <LoginForm
                formValue={formValue}
                setFormValue={setFormValue}
                handleSubmit={handleSubmit}
              />
            ) : (
              <SignUpForm
                formValue={formValue}
                setFormValue={setFormValue}
                handleSubmit={handleSubmit}
              />
            )}
          </Container>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={14} className="full-h">
          <Carousel autoplay shape="dot" className="full-h">
            <img src={Login} alt="Login" className="full-image" />
            <img src={SignUp} alt="SignUp" className="full-image" />
          </Carousel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
