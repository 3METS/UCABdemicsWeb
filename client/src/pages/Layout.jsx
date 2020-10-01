import React from "react";
import { Container, Sidebar, Sidenav } from "rsuite";

const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <Sidenav appearance="inverse"></Sidenav>
      </Sidebar>
      <Container>{children}</Container>
    </Container>
  );
};

export default Layout;
