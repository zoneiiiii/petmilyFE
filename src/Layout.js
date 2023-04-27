import Header from "./Layout/Headers/Header";
import Footer from "./Layout/Footers/Footer";
import "./Styles/Layout.css";
import styled from "styled-components";


const Layout = (props) => {
    return (
        <div className="layout">
            <Header />

            <main className="main">
                {props.children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
