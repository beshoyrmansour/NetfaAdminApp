import { AxiosResponse } from "axios";
import { TBranch } from "./Branches";

export type TUser = {
    id?: number;
    phoneNumber: string;
    name: string;
    email: string;
    password: string;
}
export interface TEmployee extends TUser {
    employmentBranchId: TBranch['id'];
}
export interface TCustomer extends TUser {
    // orders?: TOrders[];
}

export enum UsersActionTypes {
    FETCH_ALL_EMPLOYEES = "USERS__FETCH_ALL_EMPLOYEES",
    FETCH_EMPLOYEE = "USERS__FETCH_EMPLOYEE",
    ADD_EMPLOYEE = "USERS__ADD_EMPLOYEE",
    SET_SELECTED_EMPLOYEE = "USERS__SET_SELECTED_EMPLOYEE",
    REMOVE_EMPLOYEE = "USERS__REMOVE_EMPLOYEE",
    UPDATE_EMPLOYEE = "USERS__UPDATE_EMPLOYEE",
    SET_IS_LOADING_EMPLOYEES = "USERS__SET_IS_LOADING_EMPLOYEES",

    FETCH_ALL_CUSTOMERS = "USERS__FETCH_ALL_CUSTOMERS",
    FETCH_CUSTOMER = "USERS__FETCH_CUSTOMER",
    ADD_CUSTOMER = "USERS__ADD_CUSTOMER",
    SET_SELECTED_CUSTOMER = "USERS__SET_SELECTED_CUSTOMER",
    REMOVE_CUSTOMER = "USERS__REMOVE_CUSTOMER",
    UPDATE_CUSTOMER = "USERS__UPDATE_CUSTOMER",
    SET_IS_LOADING_CUSTOMERS = "USERS__SET_IS_LOADING_CUSTOMERS",
}

export type UsersActionType = {
    type: UsersActionTypes;
    payload?: any;
};


export const removeEmployeeType = (employee: TEmployee) => {
    return {
        type: UsersActionTypes.REMOVE_EMPLOYEE,
        payload: employee
    };
};

export type UsersReducerType = {
    employees: TEmployee[],
    selectedEmployee: TEmployee | {},
    isLoadingSelectedEmployee: boolean,
    isLoadingEmployees: boolean,

    customers: TCustomer[],
    selectedCustomer: TCustomer | {},
    isLoadingSelectedCustomer: boolean,
    isLoadingCustomers: boolean,
};

// EMPLOYEEs
export interface IGetEmployeesReq {
    (
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}
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


// CUSTOMERs
export interface IGetCustomersReq {
    (
        PageNumber?: number,
        PageSize?: number,
        OrderBy?: string,
    ): Promise<AxiosResponse>
}
export interface IAddNewCustomersReq {
    (CustomerData: TCustomer): Promise<AxiosResponse>
}
export interface IEditCustomersReq {
    (
        CustomerData: TCustomer, CustomerId: string
    ): Promise<AxiosResponse>
}
export interface IToggleCustomersReq {
    (
        porductIds: number[],
        CustomerIsAvailableForPurchase: boolean
    ): Promise<AxiosResponse>
}

export interface IDeleteCustomerReq {
    (CustomerId: number): Promise<AxiosResponse>
}

export interface IDeleteCustomersBulkReq {
    (CustomerIds: string[]): Promise<AxiosResponse>
}
