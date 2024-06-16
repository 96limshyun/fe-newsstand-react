import React, { useReducer } from "react";

export const SubscribeContext = React.createContext();

const initialState = { subscriptions: []};

function SubReducer(state, { type, payLoad }) {
    switch (type) {
        case "INIT_LIST":
            return { subscriptions: [...payLoad]};
        default:
            throw new Error();
    }
}

export const SubscribeProvider = (props) => {
    const [SubState, SubDispatch] = useReducer(SubReducer, initialState);

    return (
        <SubscribeContext.Provider value={[SubState, SubDispatch]}>
            {props.children}
        </SubscribeContext.Provider>
    );
};
