import React, { useEffect, useRef, useState } from "react";
import { APIManager } from "../../utility/getNewsAPI";
import { delay } from "../../utility/utils";
import styled, {keyframes} from "styled-components";

const LEFT_LENGTH = {start: 0, end: 5}
const RIGHT_LENGTH = {start: 5, end: 10}
const ANIMATION_DELAY = 2000
const ROLLING_DELAY = 5000

const RollingNews = () => {
    const [leftNews, setLeftNews] = useState([])
    const [lightNews, setLightNews] = useState([])
    const [isAnimation, setAnimation] = useState(false)
    const intervalRef = useRef()

    useEffect(() => {
        const fetchData = async () => {
            const result = await APIManager.getNewsData("latestNews");
            setLeftNews(result.slice(LEFT_LENGTH.start, LEFT_LENGTH.end))
            setLightNews(result.slice(RIGHT_LENGTH.start, RIGHT_LENGTH.end))
        };
        fetchData();
    }, []);

    const updateNews = () => {
        setLeftNews(prevLeftNews => {
            if (!prevLeftNews.length) return prevLeftNews;
            const [leftFirst, ...leftRest] = prevLeftNews;
            return [...leftRest, leftFirst];
        });
    
        setLightNews(prevLightNews => {
            if (!prevLightNews.length) return prevLightNews;
            const [lightFirst, ...lightRest] = prevLightNews;
            return [...lightRest, lightFirst];
        });
    };

    const startRollingInterval = () => {
        return setInterval(async () => {
            setAnimation(true);
            await delay(ANIMATION_DELAY);
            setAnimation(false);
            updateNews();
        }, ROLLING_DELAY);
    };
    
    const handleMouseLeave = () => intervalRef.current = startRollingInterval();

    
    useEffect(() => {
        intervalRef.current = startRollingInterval();
        return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
        return (
        <div>
            <NewsContainer onMouseOver={() => clearInterval(intervalRef.current)} onMouseLeave={handleMouseLeave}>
                <Board>
                    {leftNews.map((newsData, idx) => (
                        <LeftRollingNews className={` ${isAnimation ? 'animation' : ''}`} key={idx}>
                            <PressText>{newsData.pressName}</PressText>
                            <ContentText><a href={newsData.headline.href}>{newsData.headline.title}</a></ContentText>
                        </LeftRollingNews>
                    ))}
                </Board>
                <Board>
                {lightNews.map((newsData, idx) => (
                        <RightRollingNews className={` ${isAnimation ? 'animation' : ''}`} key={idx}>
                            <PressText>{newsData.pressName}</PressText>
                            <ContentText><a href={newsData.headline.href}>{newsData.headline.title}</a></ContentText>
                        </RightRollingNews>
                    ))}
                </Board>
            </NewsContainer>
        </div>
    );
};

export default RollingNews;

const moveDown = keyframes`
    0% {
    top: 0;
    }
    100% {
    top: -62px;
    }
`;

const NewsContainer = styled.div`
    margin-top: 10px;
    width: 950px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    &:hover .animation {
        animation-play-state: paused;
        z-index: 1;
    }
`

const Board = styled.div`
    width: 470px;
    border: none;
    overflow: hidden;
`

const PressText = styled.div`
    width: 70px;
    height: 20px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 5px;
`

const ContentText = styled.div`
    width: 364px;
    height: 20px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        text-decoration: underline;
    }
`

const NewsView = styled.div`
    margin-bottom: 10px;
    display: flex;
    width: 490px;
    padding: 16px;
    border: 1px;
    background: #F5F7F9;
    position: relative;
`;

const LeftRollingNews = styled(NewsView)`
    &.animation {
        animation: ${moveDown} 1s forwards;
    }
`; 
const RightRollingNews = styled(NewsView)`
    &.animation {
        animation: ${moveDown} 1s forwards;
        animation-delay: 1s;
    }
`;