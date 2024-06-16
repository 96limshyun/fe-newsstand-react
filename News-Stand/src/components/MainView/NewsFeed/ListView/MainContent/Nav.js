import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import { ViewContext } from "../../../ViewStore";

const Nav = ({ newsInfo, listPageNumber, setCategoryIdx, setListPageNumber, categoryIdx }) => {
    const [ViewState] = useContext(ViewContext);
    
    const switchCategory = (idx) => {
        setCategoryIdx(idx)
        setListPageNumber(0)
    }

    return (
        <>
            <CategoryNav>
                {!newsInfo.length ? (<div>Loading...</div>) : (
                    newsInfo.map((curCategory, idx) => (
                        <Item key={idx} onClick={() => switchCategory(idx)} $isCurrentCategory={categoryIdx === idx}>
                            <span>{curCategory.category}</span>
                            <TotalPage hidden={newsInfo[categoryIdx].category === curCategory.category}>
                                {ViewState.isSubscribeView ? `>` : `${listPageNumber + 1}/${curCategory.data.length}`}
                            </TotalPage>
                            {newsInfo[categoryIdx].category === curCategory.category && <AnimatedDiv />}
                        </Item>
                    ))
                )}
            </CategoryNav>
        </>
    );
};

export default Nav;

const CategoryNav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    border-bottom: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    background: var(--surface-surface-alt, rgba(245, 247, 249, 1));
    overflow-x: auto;
    white-space: nowrap;
`;


const Item = styled.div`
    display: flex;
    position: relative;
    padding: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    span {
        position: relative;
        z-index: 2;
    }
    
    transition: padding 0.5s ease;

    ${props => props.$isCurrentCategory ? `
        padding-right: 60px;
        background: rgba(196, 211, 255, 0.735);
        span {
            color: #fff;
        }
    ` : ``}
`;

const TotalPage = styled.div`
    margin-left: 20px;
    display: ${props => props.hidden ? 'inline-block' : 'none'};
    position:relative;
    z-index:2;
    color: white;
`;

const fill = keyframes`
    from {width: 0;}
    to {width:100%;}
`

const AnimatedDiv = styled.div`
    position: absolute;
    background:rgb(40, 86, 223);
    z-index:1;
    top:0; 
    left:0;
    height: 100%;
    content:'';
    animation: ${fill} 20s ease forwards;
`;