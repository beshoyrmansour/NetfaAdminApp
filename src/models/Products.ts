import { AxiosResponse } from "axios";
import { TOGGLE_MODES } from "./configs";

export type TProduct = {
    enName: string;
    arName: string;
    thumbnailBase64: string;
    unitPrice: number | null;
    mainImageId?: number | null;
    categoryId: number | null;
    defaultQuantityId: number | null;
    enDescription: string;
    arDescription: string;
    isAvailableForPurchase: boolean;
    id?: number | null;
    addedDate?: string;
    modifiedDate?: string;
    quantityEnName?: string;
    quantityValue?: number;
    quantityArName?: string;
}

export enum ProductsActionTypes {
    FETCH_ALL_PRODUCTS = "PRODUCT__FETCH_ALL_PRODUCTS",
    FETCH_PRODUCT = "PRODUCT__FETCH_PRODUCT",
    ADD_PRODUCT = "PRODUCT__ADD_PRODUCT",
    SET_SELECTED_PRODUCT = "PRODUCT__SET_SELECTED_PRODUCT",
    REMOVE_PRODUCT = "PRODUCT__REMOVE_PRODUCT",
    UPDATE_PRODUCT = "PRODUCT__UPDATE_PRODUCT",
    SET_IS_LOADING_PRODUCTS = "PRODUCT__SET_IS_LOADING_PRODUCTS",
}

export type ProductsActionType = {
    type: ProductsActionTypes;
    payload?: any;
};

export interface IGetSingleOrderItemsProductsReq {
    (
        AvailableForPurchaseOnly?: boolean,
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}

export const removeProductType = (product: TProduct) => {
    return {
        type: ProductsActionTypes.REMOVE_PRODUCT,
        payload: product
    };
};

export type ProductsReducerType = {
    products: TProduct[],
    selectedProduct: TProduct | {},
    isLoadingSelectedProduct: boolean,
    isLoadingProducts: boolean,
};

export interface IToggleProductsReq {
    (
        porductIds: number[],
        productIsAvailableForPurchase: boolean
    ): Promise<AxiosResponse>
}

export interface IDeleteProductReq {
    (porductId: number): Promise<AxiosResponse>
}

export interface IDeleteProductsBulkReq {
    (porductIds: string[]): Promise<AxiosResponse>
}
