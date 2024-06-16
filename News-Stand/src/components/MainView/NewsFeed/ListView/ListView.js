import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";
import { ViewContext } from "../../ViewStore";
import { SubscribeContext } from "../../SubscribeStore";
import Nav from "./MainContent/Nav";
import MainContent from "./MainContent/MainContent";

const IS_EMPTY = 0;
const INIT_PAGE_NUM = 0;
const INTERVAL_DURATION= 19000

const ListView = ({ newsData, showModal, handleSubscribeAction, handleUnsubscribeAction }) => {
    const [ViewState] = useContext(ViewContext);
    const [SubState] = useContext(SubscribeContext)
    const [newsInfo, setNewsInfo] = useState([]);
    const [listPageNumber, setListPageNumber] = useState(0);
    const [categoryIdx, setCategoryIdx] = useState(0);
    const [toggle, setToggle] = useState(false);

    const initUnsubscribeData = () => {
        const categoryList = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];
        const initData = [];
        categoryList.forEach((curCategory) => {
            const filteringData = newsData.filter((curData) => curData.category === curCategory);
            initData.push({ category: curCategory, data: filteringData });
        });
        setNewsInfo(initData);
    };

    const initSubscribeData = () => {
        const initData = SubState.subscriptions.map(curData => {
            return { category: curData.pressName, data: [curData] }
        });
        setNewsInfo(initData);
        setCategoryIdx(INIT_PAGE_NUM)
    }

    useEffect(() => {
        const interval = setInterval(() => {setListPageNumber(prev => prev + 1)}, INTERVAL_DURATION);
        setToggle(!toggle);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPageNumber]);
    
    useEffect(() => {
        if (!ViewState.isSubscribeView) initUnsubscribeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView]);

    useEffect(() => {
        if (ViewState.isSubscribeView) initSubscribeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView, SubState]);

    const updateCategory = {
        nextCategory() {
            setListPageNumber(INIT_PAGE_NUM);
            setCategoryIdx((prev) => prev === newsInfo.length - 1 ? INIT_PAGE_NUM : prev + 1);
        },
        prevCategory() {
            setCategoryIdx((prev) => prev === INIT_PAGE_NUM ? newsInfo.length - 1 : prev - 1);
            setListPageNumber(INIT_PAGE_NUM);
        },
    }

    useEffect(() => {
        if (newsInfo.length !== IS_EMPTY && newsInfo[categoryIdx].data.length <= listPageNumber) updateCategory["nextCategory"]() 
        if (newsInfo.length !== IS_EMPTY && listPageNumber < INIT_PAGE_NUM) updateCategory["prevCategory"]()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPageNumber]);
    

    return (
        <ListMainView>
            <LeftButtonIMG
                onClick={() => setListPageNumber((prev) => prev - 1)}
            />

            <MainContainer>
                <Nav
                    newsInfo={newsInfo}
                    listPageNumber={listPageNumber}
                    setCategoryIdx={setCategoryIdx}
                    setListPageNumber={setListPageNumber}
                    categoryIdx={categoryIdx}
                    key={toggle ? "1" : "2"}
                ></Nav>
                <MainContent
                    newsInfo={newsInfo}
                    listPageNumber={listPageNumber}
                    categoryIdx={categoryIdx}
                    newsData={newsData}
                    showModal={showModal}
                    handleSubscribeAction={handleSubscribeAction} 
                    handleUnsubscribeAction={handleUnsubscribeAction}
                ></MainContent>
            </MainContainer>

            <RightButtonIMG
                onClick={() => setListPageNumber((prev) => prev + 1)}
            />
        </ListMainView>
    );
};

export default ListView;

const ListMainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;
