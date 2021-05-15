import { AxiosResponse } from "axios";
import { TProduct } from "./Products";

export type TCategory = {
    id: number;
    enName: string;
    arName: string;
    products: TProduct[];
    addedDate?: string;
    modifiedDate?: string;
}

export interface IAddNewCategoryReq {
    (enName: string, arName: string): Promise<AxiosResponse>
}

export interface IEditCategoryReq {
    (enName: string, arName: string, categoryId:number): Promise<AxiosResponse>
}

export interface IDeleteCategoryReq {
    (category: TCategory): Promise<AxiosResponse>
}
export interface IGetCategoriesListReq {
    (
        AvailableForPurchaseOnly?: boolean,
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}