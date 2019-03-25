import React from "react";

export const initialState = {
    hasSignerAccount: false,
    web3: null,
    account: null,
    contract: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return initialState;
        case "setWeb3":
            return {
                ...initialState,
                hasSignerAccount: true,
                web3: action.web3,
                account: action.account,
                contract: action.account
            };
        default:
            return state;
    }
};

export const AppContext = React.createContext();