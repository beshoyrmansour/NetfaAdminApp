import { EmployeesActionType, EmployeesActionTypes, EmployeesReducerType } from "../../models/Employees";

export const productsInitReducerState: EmployeesReducerType = {
    employees: [],
    selectedEmployee: {},
    isLoadingSelectedEmployee: true,
    isLoadingEmployees: true,

}

export const employeesReducer = (state: EmployeesReducerType = productsInitReducerState, action: EmployeesActionType) => {
    switch (action.type) {
        case EmployeesActionTypes.SET_IS_LOADING_EMPLOYEES:
            return {
                ...state,
                isLoadingEmployees: action.payload
            }
        case EmployeesActionTypes.FETCH_ALL_EMPLOYEES:
            return {
                ...state,
                isLoadingEmployees: false,
                employees: action.payload
            };

        case EmployeesActionTypes.SET_SELECTED_EMPLOYEE:
            return {
                ...state,
                isLoadingSelectedEmployee: false,
                selectedEmployee: action.payload
            };

        default:
            return state;
    }
};