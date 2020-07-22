import React from "react";
import { Carousel } from "antd";
import Login from "../img/Login.png";
import SingUp from "../img/SignUp.png";

function ImageViewer(props) {
  return (
    <Carousel autoplay>
      <div>
        <img style={styles} src={Login} alt="Carousel 1" />
      </div>
      <div>
        <img style={styles} src={SingUp} alt="Carousel 2" />
      </div>
    </Carousel>
  );
}

const styles = {
  height: "auto",
  width: "100%",
};

export default ImageViewer;
