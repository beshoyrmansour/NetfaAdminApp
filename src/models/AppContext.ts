import { ProductsActionType, ProductsReducerType } from "./Products";
import React from 'react'
type Dispatch = (action: ProductsActionType) => void

export type AppContextType = {
    productsReducer: { state: ProductsReducerType, dispatch: Dispatch },
};
export type AppContextProviderType = { children: React.ReactNode }
