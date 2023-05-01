import "./../../styles/Footer.css"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <h3>© PETMILY</h3>
            <div className="footer_contents">
                <div className="ex1">
                    <dt>Company</dt>
                    <dd>About us</dd>
                    <dd>Contact us</dd>
                    <dd>History</dd>
                </div>

                <div className="ex2">
                    <dt>Community</dt>
                    <dd>Featured artists</dd>
                    <dd>The Portal</dd>
                    <dd>Live events</dd>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <span className="p_tag">
                <p>©Photo,Inc.2023. We love our users!</p>
                <span className="reverse_p">
                    <img alt="github Icon" src="/images/navigator/github.png" />
                    <img alt="github Icon" src="/images/navigator/facebook.png" />
                    <img alt="github Icon" src="/images/navigator/instargram.png" />
                    <img alt="github Icon" src="/images/navigator/twitter.png" />
                    {/* 상대경로 -> 절대경로로 바꿈 */}
                    <p>Follow us: &nbsp;&nbsp;&nbsp;</p>
                </span>

            </span>
        </footer>
    );
};

export default Footer;