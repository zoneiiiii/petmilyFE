import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import '../Styles/ReturnTop.css';

const ReturnTop = () => {
    const [ScrollY, setScrollY] = useState(0);
    const [isTop, setIsTop] = useState(true);

    const handleScrollY = () => {
        setScrollY(window.scrollY);
        if (ScrollY > 10) {
            setIsTop(false);
        } else {
            setIsTop(true);
        }
    };

    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setScrollY(0);
        setIsTop(true);
    };

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleScrollY);
        };
        watch();
        return () => {
            window.removeEventListener('scroll', handleScrollY);
        };
    });

    return (
        <ScrollTop
            className={!isTop ? 'returnTop activeReturnTop' : 'returnTop'}
            onClick={onClick}
        ></ScrollTop>
    );
};

const ScrollTop = styled.div`
    .returnTop {
        position: fixed;
        bottom: 80px;
        right: 30px;
        background-image: url("../../public/images/navigator/upArrow.png");
        background-size: cover;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
    }

    .activeReturnTop {
        opacity: 1;
        visibility: visible;
        z-index: 2000;
    }
`;

export default ReturnTop;