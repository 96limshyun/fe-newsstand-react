import React, { useContext } from "react";
import styled from "styled-components";
import { SubscribeContext } from "../../../SubscribeStore";

const MainContent = ({ newsInfo, listPageNumber, categoryIdx, newsData, showModal, handleSubscribeAction }) => {
    const [SubState] = useContext(SubscribeContext);

    if (!newsInfo.length || !newsInfo[categoryIdx] || !newsInfo[categoryIdx].data[listPageNumber]) {
        return <MainNewsTemplate>Loading...</MainNewsTemplate>;
    }

    const currentNews = newsInfo[categoryIdx].data[listPageNumber];
    const { pressName, logoImageSrc, editedTime, headline, sideNews } = currentNews;
    
    return (
        <>
            <MainNewsTemplate>
                <MainNewsHeader>
                    <LogoImg src={logoImageSrc}/>
                    <EditDateText>{editedTime}</EditDateText>
                    {SubState.subscriptions.includes(currentNews) ?
                        <SubScribeButton name={pressName} onClick={() => showModal(pressName)}> + 해지하기</SubScribeButton> : 
                        <SubScribeButton name={pressName} onClick={() => handleSubscribeAction(newsData.find((data) => data.pressName === pressName))}> + 구독하기</SubScribeButton>}
                </MainNewsHeader>
                <MainNewsContent>
                    <MainHeadLine>
                        <a href={headline.href}>
                            <MainContentImg src={headline.thumbnailSrc}></MainContentImg>
                            <MainContentText>{headline.title}</MainContentText>
                        </a>
                    </MainHeadLine>
                    <SubContent>
                        {sideNews.map((sideData, idx) => (
                            <SideNewsLink href={sideData.href} key={idx}><div>{sideData.title}</div></SideNewsLink>
                        ))}
                        <EditPressText>
                            {pressName} 언론사에서 직접 편집한 뉴스입니다.
                        </EditPressText>
                    </SubContent>
                </MainNewsContent>
            </MainNewsTemplate>
        </>
    );
};


export default MainContent;

const SideNewsLink = styled.a`
    display: block;
    text-decoration: none;
    color: inherit;
    &:hover {
        text-decoration: underline;
    }
`;

const MainNewsTemplate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
`;

const MainNewsHeader = styled.div`
    width: 95%;
    height: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const LogoImg = styled.img`
    height: 100%;
    object-fit:cover;
    margin-right: 10px;
`

const EditDateText = styled.div`
    width: 150px; 
    height: 14px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`
const SubScribeButton = styled.button`
    border: 1px solid gray;
    border-radius: 13px;
    color: #8b8989;
    background-color: white;
    padding: 0 10px;
    height: 24px;
    font-size: 14px;
    background: var(--surface-surface-alt, rgba(245, 247, 249, 1));
`

const MainContentImg = styled.img`
    object-fit: cover;
    margin-bottom: 10px;
`

const MainContentText = styled.div`
    font-size: 15px;
`

const MainNewsContent = styled.div`
    width: 95%;
    height: 260px;
    display: flex;
    justify-content: space-between;
`
const MainHeadLine = styled.div`
    width: 35%;
    height: 100%;
    &:hover {
        ${MainContentImg} {
            transform: scale(1.05);
            transition-duration: 0.5s;
        }
        ${MainContentText} {
            transform: scale(1.05);
            transition-duration: 0.5s;
            text-decoration: underline;
        }
    }
`

const SubContent = styled.div`
    width: 60%;
    height: 100%;
    display: grid;
`

const EditPressText = styled.div`
    opacity: 0.5;
    font-size: 14px;
`