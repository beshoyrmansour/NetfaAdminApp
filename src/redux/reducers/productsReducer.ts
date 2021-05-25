import {  ProductsActionType, ProductsActionTypes, ProductsReducerType } from "../../models/Products";

export const productsInitReducerState: ProductsReducerType = {
    products: [],
    selectedProduct: {},
    isLoadingSelectedProduct: true,
    isLoadingProducts: true,

}

export const productsReducer = (state: ProductsReducerType = productsInitReducerState, action: ProductsActionType) => {
    switch (action.type) {
        case ProductsActionTypes.SET_IS_LOADING_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: action.payload
            }
        case ProductsActionTypes.FETCH_ALL_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: false,
                products: action.payload
            };

        case ProductsActionTypes.SET_SELECTED_PRODUCT:
            return {
                ...state,
                isLoadingSelectedProduct: false,
                selectedProduct: action.payload
            };

        default:
            return state;
    }
};