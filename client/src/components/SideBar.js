import React, { Component } from "react";
import { Button, Menu, Space } from "antd";
import {
  CalendarOutlined,
  FileOutlined,
  FolderOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./styles/SideBar.css";
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  handleClick = (e) => {
    console.log("click ", e);
    if (e.key == "5") {
    }
  };

  render() {
    return (
      <div>
        <img src="" alt="Logo Ucabdemics" style={{ padding: "1em" }} />
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          inlineCollapsed={true}
          style={{ backgroundColor: "green", height: "100vh" }}
        >
          <div
            style={{
              marginTop: "160%",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <Menu.Item
            key="1"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FileOutlined size={30} />
          </Menu.Item>
          <Menu.Item key="2">
            <FolderOutlined size={24} />
          </Menu.Item>
          <Menu.Item key="3">
            <CalendarOutlined size={24} />
          </Menu.Item>
          <Menu.Item key="4">
            <BellOutlined size={24} />
          </Menu.Item>
          <Menu.Item key="5" style={{ position: "fixed", top: "90%" }}>
            <Link to="/">
              <LogoutOutlined size={24} />
            </Link>
          </Menu.Item>
        </Menu>
        <Menu
          mode="inline"
          style={{ backgroundColor: "green", height: "100vh" }}
        >
          <Menu.Item key="1">Logoout</Menu.Item>
        </Menu>
      </div>
    );
  }
}
