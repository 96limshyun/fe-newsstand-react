import React from "react";
import mainLogo from "../../assets/img/logo.png"
import { getCurrentDate, reloadPage } from "../../utility/utils";
import styled from "styled-components";

const Header = () => {
    return (
        <HeaderView>
            <A href="/" onClick={reloadPage}>
                <IMG src={mainLogo} alt="logo"></IMG>
                <Title>뉴스스탠드</Title>
            </A>
            {getCurrentDate()}
        </HeaderView>
    );
};

export default Header;

const HeaderView = styled.header`
    display: flex;
    justify-content: space-between;
    width: 950px;
    height: 50px;
    margin: 0 auto;
`
const A = styled.a`
    display: flex;
    align-items: center;
`

const IMG = styled.img`
    margin-right: 4px;
`

const Title = styled.h1`
    font-weight: bold;
    font-size: x-large;
`
