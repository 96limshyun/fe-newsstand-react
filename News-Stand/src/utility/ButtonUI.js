import React from 'react'
import styled from 'styled-components'
import leftBtn from "../assets/img/LeftButton.png"
import rightBtn from "../assets/img/RightButton.png"

const LocationImg = styled.img`
    position: absolute;
`;

const LeftBtn = styled(LocationImg)`
    left: -55px;
    display: ${props => props.hidden ? 'none' : 'inline-block'};
`;

const RightBtn = styled(LocationImg)`
    left: 975px;
    display: ${props => props.hidden ? 'none' : 'inline-block'};
`;

export const LeftButtonIMG = ({ isHidden, onClick }) => {
    return <LeftBtn src={leftBtn} alt="left-btn" hidden={isHidden} onClick={onClick} />;
};

export const RightButtonIMG = ({ isHidden, onClick }) => {
    return <RightBtn src={rightBtn} alt="right-btn" hidden={isHidden} onClick={onClick} />;
};

