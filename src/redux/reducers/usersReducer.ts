import { UsersActionType, UsersActionTypes, UsersReducerType } from "../../models/Users";

export const usersInitReducerState: UsersReducerType = {
    employees: [],
    selectedEmployee: {},
    isLoadingSelectedEmployee: true,
    isLoadingEmployees: true,

    customers: [],
    selectedCustomer: {},
    isLoadingSelectedCustomer: true,
    isLoadingCustomers: true,

}

export const usersReducer = (state: UsersReducerType = usersInitReducerState, action: UsersActionType) => {
    switch (action.type) {
        // EMPLOYEES
        case UsersActionTypes.SET_IS_LOADING_EMPLOYEES:
            return {
                ...state,
                isLoadingEmployees: action.payload
            }
        case UsersActionTypes.FETCH_ALL_EMPLOYEES:
            return {
                ...state,
                isLoadingEmployees: false,
                employees: action.payload
            };

        case UsersActionTypes.SET_SELECTED_EMPLOYEE:
            return {
                ...state,
                isLoadingSelectedEmployee: false,
                selectedEmployee: action.payload
            };

        // CUSTOMERS
        case UsersActionTypes.SET_IS_LOADING_CUSTOMERS:
            return {
                ...state,
                isLoadingCustomers: action.payload
            }
        case UsersActionTypes.FETCH_ALL_CUSTOMERS:
            return {
                ...state,
                isLoadingCustomers: false,
                customers: action.payload
            };

        case UsersActionTypes.SET_SELECTED_CUSTOMER:
            return {
                ...state,
                isLoadingSelectedCustomer: false,
                selectedCustomer: action.payload
            };

        default:
            return state;
    }
};