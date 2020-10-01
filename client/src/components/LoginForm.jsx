import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Content,
  Footer,
  Button,
  Checkbox,
  Grid,
  Row,
  Col,
  InputGroup,
  Icon,
  Form,
  FormControl,
  FormGroup,
  Schema,
} from "rsuite";

export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { StringType } = Schema.Types;
  const form = React.createRef();

  const model = Schema.Model({
    email: StringType()
      .isEmail("Ingrese un email valido.")
      .isRequired("Este campo es requerido."),
    password: StringType().isRequired("Este campo de requerido."),
  });

  function onChangeForm(formValue) {
    props.setFormValue(formValue);
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    props.handleSubmit(e, form.current);
  }
  return (
    <>
      <Content className="full-w">
        <Grid fluid>
          <Row>
            <h3>Iniciar Sesión</h3>
          </Row>
          <Row>
            <p className="gray-text">
              Inicie sesión para continuar a nuestra aplicación
            </p>
          </Row>
          <Row>
            <Form
              model={model}
              formValue={props.formValue}
              onChange={onChangeForm}
              ref={form}
            >
              <Row className="row">
                <InputGroup inside>
                  <FormControl
                    name="email"
                    placeholder="Email"
                    type="email"
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
                    name="password"
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
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <Checkbox>Recuerdame</Checkbox>
                  </Col>
                  <Col md={10} xsPush={8}>
                    <Button
                      appearance="link"
                      style={{ paddingRight: 0, marginRight: 0 }}
                    >
                      <Link to="/recovery-password">
                        <p className="split-button-text forgot-button">
                          ¿Olvidó su contraseña?
                        </p>
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
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
          <Link to="/class-plans">
            <strong style={{ color: "white" }}>Iniciar Sesión</strong>
          </Link>
        </Button>
      </Footer>
    </>
  );
}
