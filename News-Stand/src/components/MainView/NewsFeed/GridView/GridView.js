import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {LeftButtonIMG, RightButtonIMG} from "../../../../utility/ButtonUI"
import { SubscribeContext } from "../../SubscribeStore";
import { ViewContext } from "../../ViewStore";

const GRID_BATCH_SIZE = 24;
const TOTAL_PAGES = 4;

const GridView = ({ newsData, showModal, handleSubscribeAction }) => {
    const [SubState] = useContext(SubscribeContext)
    const [ViewState] = useContext(ViewContext)
    const [newsInfo, setNewsInfo] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const sliceIntoChunks = (idx, copiedData) => {
        const startIndex = idx * GRID_BATCH_SIZE;
        const endIndex = startIndex + GRID_BATCH_SIZE;
        return copiedData.slice(startIndex, endIndex);
    }

    const initData = () => {
        const copiedData = [...newsData].sort(() => Math.random() - 0.5);
        const slicedData = Array.from({ length: TOTAL_PAGES }, (_, idx) => sliceIntoChunks(idx, copiedData));
        setNewsInfo(slicedData);
    };

    const initDataForSubscribeView = () => {
        const subscribeData = [...SubState.subscriptions];
        const slicedData = [];
        if (subscribeData.length % GRID_BATCH_SIZE !== 0) {
            const emptyCellsCount = GRID_BATCH_SIZE - (subscribeData.length % GRID_BATCH_SIZE);
            const emptyCells = Array.from({ length: emptyCellsCount }, () => "");
            subscribeData.push(...emptyCells);
        }
        slicedData.push(subscribeData.splice(0 , GRID_BATCH_SIZE));
        setNewsInfo(slicedData);
        setPageNumber(0)
    };
    
    useEffect(() => {
        if (!ViewState.isSubscribeView) initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView, newsData])

    useEffect(() => {
        if (ViewState.isSubscribeView)  initDataForSubscribeView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView, newsData, SubState])
    
    return (
        <GridMainView>

            <LeftButtonIMG isHidden={pageNumber === 0} onClick={() => setPageNumber(prev => prev - 1)} />

                <GridContainer>
                    {!newsInfo.length ? (<div>Loading...</div>) : (
                    newsInfo[pageNumber].map((pageData, index) => (
                        pageData === "" ? <List key={index} className={index}></List> :
                        <List key={index} className={index}>
                            <PressImg src={pageData.logoImageSrc} alt={pageData.pressName}></PressImg>
                            {SubState.subscriptions.some(subscription => subscription.pressName === pageData.pressName) ? 
                            <SubScribeButton name = {pageData.pressName} onClick={() => showModal(pageData.pressName)}> + 해지하기</SubScribeButton> : 
                            <SubScribeButton name = {pageData.pressName} onClick={() => handleSubscribeAction(newsData.find((data) => data.pressName === pageData.pressName))}> + 구독하기</SubScribeButton>}
                            
                        </List>
                    )))}
                </GridContainer>

                <RightButtonIMG isHidden={newsInfo.length - 1 === pageNumber} onClick={() => setPageNumber(prev => prev + 1)} />

        </GridMainView>
    );
};
export default GridView;

const GridMainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`

const GridContainer = styled.ul`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 0;
`;

const PressImg = styled.img`
    width: 60%;
    height: 60%;
    height: 2rem;
`

const SubScribeButton = styled.button`
    display: none;
    border: 1px solid gray;
    border-radius: 13px;
    color: #8b8989;
    background-color: white;
    padding: 0 10px;
`

const List = styled.li`
    width: 100%;
    height: 100%;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    border-bottom: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    ${({ className }) =>
        [5, 11, 17, 23].includes(Number(className)) &&
        `border-right: none;`
    }
    ${({ className }) =>
        [18, 19, 20, 21, 22, 23].includes(Number(className)) &&
        `border-bottom: none;`
    }
    &:hover {
        ${PressImg} {
            display: none;
        }
        ${SubScribeButton} {
            display: inline;
        }
    }
`