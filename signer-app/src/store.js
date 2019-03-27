
import React from "react";

export const initialState = {
    hasSignerAccount: false,
    web3: null,
    account: null,
    contract: null,
    certificates: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;
        case "SET_WEB3":
            return {
                ...initialState,
                hasSignerAccount: true,
                web3: action.web3,
                account: action.account,
                contract: action.account
            };
        case "ADD_CERTIFICATE":
            return {
                ...state,
                certificates: [...state.certificates,
                {
                    id: action.id,
                    hash: action.hash,
                    createdAt: action.createdAt
                }]
            };
        default:
            return state;
    }
};

export const AppContext = React.createContext();