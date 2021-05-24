import { AxiosResponse } from "axios";
import { TProduct } from "./Products";

export type TBundle = {

    id?: number; // 0,
    addedDate?: string; // "2021-05-13T06:31:52.071Z",
    modifiedDate?: string; // "2021-05-13T06:31:52.071Z",
    enName: string; // "string",
    arName: string; // "string",
    thumbnailBase64: string; // "string",
    unitPrice: number; // 0,
    isAvailableForPurchase: boolean; // true,
    categoryId: number; // 0,
    enDescription: string; // "string",
    arDescription: string; // "string",
    mainImageId?: number; // 0,
    content?: TProduct[];
    contentIds?: number[];
}


export enum BundlesActionTypes {
    FETCH_ALL_PRODUCTS = "BUNDLES__FETCH_ALL_PRODUCTS",
    FETCH_PRODUCT = "BUNDLES__FETCH_PRODUCT",
    ADD_PRODUCT = "BUNDLES__ADD_PRODUCT",
    SET_SELECTED_PRODUCT = "BUNDLES__SET_SELECTED_PRODUCT",
    REMOVE_PRODUCT = "BUNDLES__REMOVE_PRODUCT",
    UPDATE_PRODUCT = "BUNDLES__UPDATE_PRODUCT",
    SET_IS_LOADING_PRODUCTS = "BUNDLES__SET_IS_LOADING_PRODUCTS",

}
export interface IGetBundlesListReq {
    (
        AvailableForPurchaseOnly: boolean,
        PageNumber: number,
        PageSize: number,
        OrderBy: string,
    ): Promise<AxiosResponse>
}
