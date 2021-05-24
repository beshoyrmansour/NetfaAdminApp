import { ProductsActionType, ProductsReducerType } from "../../models/Products";
import { BundlesActionTypes } from "../../models/Bundles";

export const productsInitReducerState: ProductsReducerType = {
    products: [],
    selectedProduct: {},
    isLoadingSelectedProduct: true,
    isLoadingProducts: true,

}

export const bundlesReducer = (state: ProductsReducerType = productsInitReducerState, action: ProductsActionType) => {
    switch (action.type as any) {
        case BundlesActionTypes.SET_IS_LOADING_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: action.payload
            }
        case BundlesActionTypes.FETCH_ALL_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: false,
                products: action.payload
            };

        case BundlesActionTypes.SET_SELECTED_PRODUCT:
           return {
                ...state,
                isLoadingSelectedProduct: false,
                selectedProduct: action.payload
            };

        default:
            return state;
    }
};