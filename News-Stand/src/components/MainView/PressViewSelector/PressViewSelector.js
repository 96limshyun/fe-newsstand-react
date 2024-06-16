import React, { useContext } from 'react'
import styled from 'styled-components'
import listOnIcon from "../../../assets/img/list-view-on.png"
import listOffIcon from "../../../assets/img/list-view-off.png"
import gridOnIcon from "../../../assets/img/grid-view-on.png"
import gridOffIcon from "../../../assets/img/grid-view-off.png"
import { ViewContext } from '../ViewStore'

const PressViewSelector = () => {
    const [ViewState, ViewDispatch] = useContext(ViewContext)

    return (
        <div>
            <MainNav>
                <SubscribePressView>
                    <Button className={` ${ViewState.isSubscribeView ? ``: `active`}` } onClick={() => ViewDispatch({ type: "SET_UNSUBSCRIBE_VIEW"})} >전체 언론사</Button>
                    <Button className={` ${ViewState.isSubscribeView ? `active`: ``} `} onClick={() => ViewDispatch({ type: "SET_SUBSCRIBE_VIEW"})}>구독한 언론사</Button>
                </SubscribePressView>
                <SortView>
                    <img src={ViewState.isListView ? listOnIcon : listOffIcon} alt="List View" onClick={() => ViewDispatch({ type: "SET_LIST_VIEW"})}></img>
                    <img src={ViewState.isListView ? gridOffIcon : gridOnIcon} alt="grid View" onClick={() => ViewDispatch({ type: "SET_GRID_VIEW"})}></img>
                </SortView>
            </MainNav>
        </div>
    )
}

export default PressViewSelector

const MainNav = styled.nav`
    display: flex;
    justify-content: space-between;
`

const SubscribePressView = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
`

const SortView = styled.div`
    display: flex;
    width: 60px;
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    &.active {
        font-weight: bold;
        font-size: large;
    }
`