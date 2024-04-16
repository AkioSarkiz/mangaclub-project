import React from "react";
import Container from "../components/Container";
import Drawer from "../components/Drawer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
  return (
    <Container>
      <Drawer />
      <Navbar />

      <Outlet />
    </Container>
  );
};

export default DefaultLayout;
