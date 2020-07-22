import React from "react";
import { Layout } from "antd";
import Navbar from "../components/SideBar";

export default function LayoutFormater(props) {
  return (
    <React.Fragment>
      <Layout>
        <Layout.Sider
          width={100}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            backgroundColor: "white",
          }}
        >
          <Navbar />
        </Layout.Sider>
        <Layout.Content style={{ marginLeft: "100px", minHeight: "100vh" }}>
          {props.children}
        </Layout.Content>
      </Layout>
    </React.Fragment>
  );
}
