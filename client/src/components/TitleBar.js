import React, { Component } from "react";
import { Row, Col } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export default class TitleBar extends Component {
  render() {
    return (
      <Row justify="center" style={styles.color} align="middle">
        <Col span={1} style={styles.children}>
          <MenuOutlined style={{ fontSize: 20, color: "#C8C8C8" }} />
        </Col>
        <Col span={6} style={{ backgroundColor: "green" }}></Col>
        <Col flex="auto"></Col>
        <Col span={2} style={{ backgroundColor: "blue" }}></Col>
        <Col span={2} style={{ backgroundColor: "brown" }}></Col>
      </Row>
    );
  }
}

const styles = {
  color: {
    minHeight: "90px",
    minWidth: "100%",
    backgrounColor: "white",
    borderBottom: "#C8C8C8 1px solid",
  },

  children: {
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
};
