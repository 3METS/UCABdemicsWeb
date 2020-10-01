import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginSignUpPage from "../pages/LoginSignUpPage";
import RecoveryPasswordPage from "../pages/RecoveryPasswordPage";
import Layout from "../pages/Layout";
import ClassPlansPage from "../pages/ClassPlansPage";

import "../styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login-signup">
          <LoginSignUpPage />
        </Route>
        <Route exact path="/recovery-password">
          <RecoveryPasswordPage />
        </Route>
        <Route exact path="/class-plans">
          <Layout>
            <ClassPlansPage />
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
