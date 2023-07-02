import { createContext, useReducer, useState } from "react";
import React from "react";

export const CollectionContext = createContext();

const collectionReducer = (state, action) => {
    switch (action.type) {
        case "ADD_DOCUMENTS":
            return { ...state, document: action.payLoad, error: null, success: true };
        case "ERROR":
            return { ...state, error: action.payLoad, success: false };
    }
};

export default function CollectionProvider({ children }) {
    const [state, dispatch] = useReducer(collectionReducer, {
        document: [],
        error: null,
        success: false,
    });
    return <CollectionContext.Provider value={{ ...state, dispatch }}>{children}</CollectionContext.Provider>;
}
