import { AxiosResponse } from "axios";

export type TQuantity = {
    id: number;
    addedDate?: string;
    modifiedDate?: string;
    enName: string;
    value: number;
    arName: string;
};

export interface IGetQuantitiesListReq {
    (
        AvailableForPurchaseOnly?: boolean,
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}

export interface IAddNewQuantityReq {
    (enName: string, arName: string, value: number): Promise<AxiosResponse>
}

export interface IEditQuantityReq {
    (enName: string, arName: string, value: number, categoryId: number): Promise<AxiosResponse>
}

export interface IDeleteQuantityReq {
    (quantity: TQuantity): Promise<AxiosResponse>
}