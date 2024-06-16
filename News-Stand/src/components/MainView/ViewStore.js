import React, { useReducer } from "react";

export const ViewContext = React.createContext();

const initialState = {
    isSubscribeView: false,
    isListView: false,
};

function ViewReducer(state, { type }) {
    switch (type) {
        case "SET_SUBSCRIBE_VIEW":
            return {...state, isSubscribeView: true, isListView: true}
        case "SET_UNSUBSCRIBE_VIEW":
            return {...state, isSubscribeView: false, isListView: false}
        case "SET_LIST_VIEW":
            return {...state, isListView: true}
        case "SET_GRID_VIEW":
            return {...state, isListView: false}
            default:
            throw new Error();
    }
}

export const ViewProvider = (props) => {
    const [ViewState, ViewDispatch] = useReducer(ViewReducer, initialState)

    return (
        <ViewContext.Provider value={[ViewState, ViewDispatch]}>
            {props.children}
        </ViewContext.Provider>
    )
}
