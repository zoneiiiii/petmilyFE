import Header from "./Layout/Headers/Header";
import Footer from "./Layout/Footers/Footer";
import "./Styles/Layout.css";
import ReturnTop from "./Layout/ReturnTop";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="main">
        <Outlet />
      </div>
      <ReturnTop />
      <Footer className="footer" />
    </div>
  );
};

export default Layout;
