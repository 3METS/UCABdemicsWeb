import React, { useState } from "react";
import {
  Content,
  Footer,
  Button,
  Grid,
  Row,
  InputGroup,
  Icon,
  Form,
  FormControl,
  Schema,
} from "rsuite";

export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const { StringType } = Schema.Types;
  const form = React.createRef();

  const model = Schema.Model({
    email: StringType()
      .isEmail("Ingrese un email valido.")
      .isRequired("Este campo es requerido."),
    password: StringType().isRequired("Este campo es requerido."),
    verifyPassword: StringType()
      .addRule((value, data) => {
        console.log(data, value);
        if (value !== data.newPassword) {
          return false;
        }
        return true;
      }, "Las contraseñas no coinciden.")
      .isRequired("Este campo es requerido."),
  });

  function onChangeForm(formValue) {
    props.setFormValue(formValue);
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function toggleVerifyPassword() {
    setShowVerifyPassword(!showVerifyPassword);
  }

  function handleSubmit(e) {
    props.handleSubmit(e, form.current);
  }
  return (
    <>
      <Content className="full-w">
        <Grid fluid>
          <Row>
            <h3>Registro</h3>
          </Row>
          <Row>
            <p className="gray-text">
              Regístrese para comenzar a usar nuestra aplicación
            </p>
          </Row>
          <Row>
            <Form
              model={model}
              formValue={props.formValue}
              onChange={onChangeForm}
              ref={form}
            >
              <Row className="row-2">
                <InputGroup inside>
                  <FormControl
                    name="newEmail"
                    type="email"
                    placeholder="Email"
                    className="input"
                  />
                  <InputGroup.Addon>
                    <Icon icon="envelope" className="gray-text" />
                  </InputGroup.Addon>
                </InputGroup>
              </Row>
              <Row>
                <InputGroup inside>
                  <FormControl
                    name="newPassword"
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    className="input"
                  />
                  <InputGroup.Button onClick={togglePassword}>
                    <Icon
                      icon={showPassword ? "eye" : "eye-slash"}
                      className="gray-text"
                    />
                  </InputGroup.Button>
                </InputGroup>
              </Row>
              <Row className="row-2">
                <InputGroup inside>
                  <FormControl
                    name="verifyPassword"
                    placeholder="Repetir Contraseña"
                    type={showVerifyPassword ? "text" : "password"}
                    className="input"
                  />
                  <InputGroup.Button onClick={toggleVerifyPassword}>
                    <Icon
                      icon={showVerifyPassword ? "eye" : "eye-slash"}
                      className="gray-text"
                    />
                  </InputGroup.Button>
                </InputGroup>
              </Row>
            </Form>
          </Row>
        </Grid>
      </Content>
      <Footer className="full-w">
        <Button
          appearance="primary"
          block
          className="custom-button"
          onClick={handleSubmit}
        >
          <strong>Registrarse</strong>
        </Button>
      </Footer>
    </>
  );
}
