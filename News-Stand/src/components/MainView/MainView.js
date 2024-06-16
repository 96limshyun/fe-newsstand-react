import React from "react";
import PressViewSelector from "./PressViewSelector/PressViewSelector";
import NewsFeed from "./NewsFeed/NewsFeed";
import styled from "styled-components";
import { SubscribeProvider } from "./SubscribeStore";
import { ViewProvider } from "./ViewStore";

const MainView = () => {
    return (
        <ViewProvider>
            <SubscribeProvider>
                <Main>
                    <PressViewSelector/>
                    <NewsFeed/>
                </Main>
            </SubscribeProvider>
        </ViewProvider>
    );
};

export default MainView;

const Main = styled.div`
    margin-top: 20px;
    width: 950px;
    height: 420px;
`