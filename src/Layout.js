import Header from "./Layout/Headers/Header";
import Footer from "./Layout/Footers/Footer";
import "./styles/Layout.css";
import styled from "styled-components";
import { Outlet } from "react-router-dom";


const Layout = (props) => {
    return (
        <div className="layout">
            <Header />

            <main className="main">
                <Outlet/>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
