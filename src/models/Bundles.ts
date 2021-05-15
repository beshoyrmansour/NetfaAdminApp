import { AxiosResponse } from "axios";
import { TProduct } from "./Products";

export type TBundle = {

    id: number; // 0,
    addedDate: string; // "2021-05-13T06:31:52.071Z",
    modifiedDate: string; // "2021-05-13T06:31:52.071Z",
    enName: string; // "string",
    arName: string; // "string",
    thumbnailBase64: string; // "string",
    unitPrice: number; // 0,
    isAvailableForPurchase: boolean; // true,
    categoryId: number; // 0,
    enDescription: string; // "string",
    arDescription: string; // "string",
    mainImageId: number; // 0,
    content: TProduct[];
}

export interface IGetBundlesListReq {
    (
        AvailableForPurchaseOnly: boolean,
        PageNumber: number,
        PageSize: number,
        OrderBy: string,
    ): Promise<AxiosResponse>
}