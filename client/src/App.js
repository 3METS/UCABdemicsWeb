import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./pages/LayoutFormater";

import LoginSignUp from "./pages/LoginSignUp";
import PlanesClases from "./pages/PlanesClases";
import TitleBar from "./components/TitleBar";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginSignUp} />
        <Layout>
          <TitleBar />
          <Switch>
            <Route exact path="/planes-clases" component={PlanesClases} />
          </Switch>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
