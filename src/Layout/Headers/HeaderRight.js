import { Link, useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styled from "styled-components";


const HeaderRight = ({ page }) => {
    const navigate = useNavigate();

    //임시 sessionStorage
    sessionStorage.setItem('id', 'admin');
    sessionStorage.setItem('name', '관리자');
    // alert(sessionStorage.getItem('id'));

    const loginId = window.sessionStorage.getItem('id');
    const loginName = window.sessionStorage.getItem('name');

    // 로그아웃 이벤트
    const logoutClick = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            window.sessionStorage.clear();
            return navigate('/', { replace: true });   // true: 뒤로가기 불가능 메인으로 이동.
        } else {
            return false;
        }
    }
    // 로그인 상태일때
    if (loginId != null) {
        return (
            <HeadrRight className="headright">
                <Stack className="stack" spacing={2} direction="row" >
                    <Button variant="outlined" size="large"
                        sx={{
                            m: 1,
                            color: '#FFFFFF',
                            background: "#FBD385",
                            borderColor: '#FBD385',
                            ":hover": { borderColor: "#FFBE3F", background: "#FFBE3F" },
                        }}>마이페이지</Button>
                    <Button variant="outlined" size="large"
                        sx={{
                            m: 1,
                            color: "#FFFFFF",
                            background: "#FF8282",
                            borderColor: "#FF8282",
                            ":hover": { borderColor: "#ED4F4F", background: "#ED4F4F" },
                        }}>로그아웃</Button>
                </Stack>
            </HeadrRight>
        );

    }

    return (
        <HeadrRight className="headright">
            <Stack className="stack" spacing={2} direction="row" >
                <Button variant="outlined" size="large"
                    sx={{
                        m: 1,
                        color: '#FFFFFF',
                        background: "#FBD385",
                        borderColor: '#FBD385',
                        ":hover": { borderColor: "#FFBE3F", background: "#FFBE3F" },
                    }}>로그인</Button>
                <Button variant="outlined" size="large"
                    sx={{
                        m: 1,
                        color: "#FFFFFF",
                        background: "#BFBFBF",
                        borderColor: "#BFBFBF",
                        ":hover": { borderColor: "gray", background: "gray" },
                    }}>회원가입</Button>
            </Stack>
        </HeadrRight>
    );
};

const HeadrRight = styled.div`
    .stack {
        width: 20vw;
        margin-left: 100px;
        padding-top: 15px;
        align-items: center;
        justify-content: center;
    }
`;

export default HeaderRight;