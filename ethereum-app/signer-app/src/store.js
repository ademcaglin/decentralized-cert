import React from "react";

export const initialState = {
    certificates: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "RESET":
            return initialState;
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