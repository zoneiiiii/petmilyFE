import Header from "./Headers/Header";
import Footer from "./Footers/Footer";
import ReturnTop from "./ReturnTop";
import "../Styles/Layout.css";
import { Outlet } from "react-router";
import styled from "styled-components";


const Layout = () => {
    return (
        <div className="layout">
            <Header />

            <main className="main">
                <Outlet />
            </main>
            <ReturnTop />
            <Footer />
        </div>

    );
};

export default Layout;
