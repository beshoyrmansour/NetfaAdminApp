import { AxiosResponse } from "axios";
import { TBranch } from "./Branches";

export type TEmployee = {
    id?: number;
    phoneNumber: string;
    name: string;
    email: string;
    password: string;
    employmentBranchId: TBranch['id'];
}

export enum EmployeesActionTypes {
    FETCH_ALL_EMPLOYEES = "EMPLOYEE__FETCH_ALL_EMPLOYEES",
    FETCH_EMPLOYEE = "EMPLOYEE__FETCH_EMPLOYEE",
    ADD_EMPLOYEE = "EMPLOYEE__ADD_EMPLOYEE",
    SET_SELECTED_EMPLOYEE = "EMPLOYEE__SET_SELECTED_EMPLOYEE",
    REMOVE_EMPLOYEE = "EMPLOYEE__REMOVE_EMPLOYEE",
    UPDATE_EMPLOYEE = "EMPLOYEE__UPDATE_EMPLOYEE",
    SET_IS_LOADING_EMPLOYEES = "EMPLOYEE__SET_IS_LOADING_EMPLOYEES",
}

export type EmployeesActionType = {
    type: EmployeesActionTypes;
    payload?: any;
};

export interface IGetSingleOrderItemsEmployeesReq {
    (
        AvailableForPurchaseOnly?: boolean,
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}

export const removeEmployeeType = (employee: TEmployee) => {
    return {
        type: EmployeesActionTypes.REMOVE_EMPLOYEE,
        payload: employee
    };
};

export type EmployeesReducerType = {
    employees: TEmployee[],
    selectedEmployee: TEmployee | {},
    isLoadingSelectedEmployee: boolean,
    isLoadingEmployees: boolean,
};

export interface IAddNewEmployeesReq {
    (EmployeeData: TEmployee): Promise<AxiosResponse>
}
export interface IEditEmployeesReq {
    (
        EmployeeData: TEmployee, employeeId: string
    ): Promise<AxiosResponse>
}
export interface IToggleEmployeesReq {
    (
        porductIds: number[],
        employeeIsAvailableForPurchase: boolean
    ): Promise<AxiosResponse>
}

export interface IDeleteEmployeeReq {
    (employeeId: number): Promise<AxiosResponse>
}

export interface IDeleteEmployeesBulkReq {
    (employeeIds: string[]): Promise<AxiosResponse>
}
