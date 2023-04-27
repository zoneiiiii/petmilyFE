import { Link } from "react-router-dom";
import styled from "styled-components";


const HeaderLeft = ({ page }) => {
    <LogoStyle>
        <div className="logo">
            <Link to='/main'>
                <img alt="petmily icon" src="./../images/petmilylogo.png" />
            </Link>
        </div>
    </LogoStyle>
}

export default HeaderLeft;

const LogoStyle = styled.div`

`