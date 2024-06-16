import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { APIManager } from "../../../utility/getNewsAPI";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import { openNotification } from "../../../utility/SnackbarUI";
import { SubscribeContext } from "../SubscribeStore";
import { ViewContext } from "../ViewStore";
import { Modal } from "antd";
import { showSubscribeModal } from "../../../utility/SnackbarUI";

const NewsFeed = () => {
    const [newsData, setNewsData] = useState([]);
    const [SubState, SubDispatch] = useContext(SubscribeContext);
    const [ViewState, ViewDispatch] = useContext(ViewContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const showModal = (pressName) => {
        setModalContent(pressName);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleUnsubscribeAction();
        setIsModalOpen(false);
    };

    const handleCancel = () => setIsModalOpen(false);

    const updateSubscription = async () => {
        const subscribeList = await APIManager.getNewsData("subscribeInfo");
        SubDispatch({ type: "INIT_LIST", payLoad: subscribeList });
    };

    const handleSubscribeAction = async (pressInfo) => {
        showSubscribeModal(pressInfo.pressName, "구독되었습니다.");
        await APIManager.postNewsData(pressInfo);
        await updateSubscription();
    };
    
    const handleUnsubscribeAction = async () => {
        showSubscribeModal(modalContent, "구독 취소되었습니다.");
        await APIManager.deleteNewsData(modalContent);
        await updateSubscription();
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            const newsResult = await APIManager.getNewsData("news");
            const subscribeResult = await APIManager.getNewsData("subscribeInfo");
            setNewsData(newsResult);
            SubDispatch({ type: "INIT_LIST", payLoad: subscribeResult });
        };
        fetchInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (ViewState.isSubscribeView && !SubState.subscriptions.length) {
            openNotification("top");
            ViewDispatch({ type: "SET_UNSUBSCRIBE_VIEW" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ViewState.isSubscribeView, SubState.subscriptions.length]);
    return (
        <FeedContainer>
            {ViewState.isListView ? (
                <ListView
                    newsData={newsData}
                    showModal={showModal}
                    handleSubscribeAction={handleSubscribeAction}
                />
            ) : (
                <GridView
                    newsData={newsData}
                    showModal={showModal}
                    handleSubscribeAction={handleSubscribeAction}
                />
            )}
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p style={{ fontSize: "15px" }}>
                    <span style={{ fontWeight: "bold" }}>{modalContent}</span>{" "}
                    언론사 구독을 해지하시겠습니까?
                </p>
            </Modal>
        </FeedContainer>
    );
};

export default NewsFeed;

const FeedContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 388px;
    border: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
`;
