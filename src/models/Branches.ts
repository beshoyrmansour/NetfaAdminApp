import { AxiosResponse } from "axios"

export type TAddress = {
    id?: number;
    addedDate?: string;
    modifiedDate?: string;
    addressTitle?: string;
    buildingNumber: string;
    streetName?: string;
    neighbourhood?: string;
    state?: string;
    unitNumber: string;
    floorNumber: string;
    latitude: number;
    longitude: number;
    recipientPhoneNumber?: string;
    nearestLandMark?: string;
}

export type TBranch = {
    id?: number;
    addedDate?: string;
    modifiedDate?: string;
    enBranchName: string;
    arBranchName: string;
    address: TAddress;
}


export interface IGetBranchesListReq {
    (): Promise<AxiosResponse>
}

export enum BranchesActionTypes {
    FETCH_ALL_BRANCHES = "BRANCH__FETCH_ALL_BRANCHES",
    SET_SELECTED_BRANCH = "BRANCH__SET_SELECTED_BRANCH",
    SET_IS_LOADING_BRANCHES = "BRANCH__SET_IS_LOADING_BRANCHES",
    SET_IS_LOADING_SELECTED_BRANCH = "BRANCH__SET_IS_LOADING_SELECTED_BRANCH",
    SET_BRANCH_ACTIVE_MODE = "BRANCH__SET_ACTIVE_MODE",

}

export interface IToggleBranchesReq {
    (
        branchIds: number[],
        branchIsAvailableForPurchase: boolean
    ): Promise<AxiosResponse>
}

export interface IDeleteBranchReq {
    (branchId: number): Promise<AxiosResponse>
}

export interface IDeleteBranchesBulkReq {
    (branchIds: string[]): Promise<AxiosResponse>
}

export interface IAddNewBranchReq {
    (enName: string, arName: string, address: TAddress): Promise<AxiosResponse>
}

export interface IEditBranchReq {
    (enName: string, arName: string, address: TAddress, categoryId: number): Promise<AxiosResponse>
}

