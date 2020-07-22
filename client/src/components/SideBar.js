import React, { Component } from "react";
import { Button } from "antd";
import {
  CalendarOutlined,
  FileOutlined,
  FolderOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./styles/SideBar.css";

export default class SideBar extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 16,
          height: "100%",
          backgroundColor: "red",
        }}
      >
        <div
          style={{
            height: "100%",
            position: "fixed",
            backgroundColor: "green",
            width: "50px",
            zIndex: "-1",
          }}
        ></div>
        <div
          id="logo"
          style={{
            flexGrow: 4,
            backgroundColor: "blue",
          }}
        ></div>
        <div
          id="options"
          style={{
            flexGrow: 8,
            backgroundColor: "white",
          }}
        >
          <div className="container square"></div>
          <div className="container icon-container icon-container-selected"></div>
          <div className="container square"></div>
          <div className="container icon-container"></div>
          <div className="container square"></div>
          <div className="container icon-container"></div>
          <div className="container square"></div>
          <div className="container icon-container"></div>
        </div>
        <div
          id="logout"
          style={{
            flexGrow: 4,
            backgroundColor: "black",
          }}
        ></div>
      </div>
    );
  }
}
