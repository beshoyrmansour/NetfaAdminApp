import axios from "../../api/axios";
import { TEmployee, IGetSingleOrderItemsEmployeesReq, IToggleEmployeesReq, IDeleteEmployeesBulkReq, IDeleteEmployeeReq, EmployeesActionTypes, IAddNewEmployeesReq, IEditEmployeesReq } from "../../models/Employees";
import END_POINTS from '../../api/endPoints';
import { TOGGLE_MODES, UI_FROM_MODE } from "../../models/configs";

export const getEmployees: IGetSingleOrderItemsEmployeesReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.EMPLOYEES)
}

export const addNewEmploye: IAddNewEmployeesReq = (employeeData) => {
    return axios.post(`${END_POINTS.EMPLOYEES}`,
        { ...employeeData }
    )
}

export const editEmployee: IEditEmployeesReq = (employeeData, employeeId) => {
    return axios.put(`${END_POINTS.EMPLOYEES}/${employeeId}`,
        { ...employeeData }
    )
}

export const toggleEmployees: IToggleEmployeesReq = (employeeIds, employeeIsAvailableForPurchase) => {
    return axios.put(`${END_POINTS.EMPLOYEES}/${employeeIsAvailableForPurchase ? TOGGLE_MODES.DISABLE : TOGGLE_MODES.ENABLE}`,
        [...employeeIds]
    )

}

export const deleteEmployeesBulk: IDeleteEmployeesBulkReq = (porductIds) => {
    const newIDs = porductIds.map((item: string) => parseInt(item, 10))
    return axios({
        method: 'DELETE',
        url: `${END_POINTS.EMPLOYEES}/SingleOrderItemsRange`,
        data: newIDs
    }
    )

}
export const deleteEmployee: IDeleteEmployeeReq = (employeeId) => {
    return axios.delete(`${END_POINTS.EMPLOYEES}/${employeeId}`)
}

export const loadEmployeesList: (dispatch: any) => void = (dispatch) => {
    getEmployees().then((res) => {
        if (res.status === 200) {
            dispatch({
                type: EmployeesActionTypes.FETCH_ALL_EMPLOYEES,
                payload: res.data.employees
            })
        }
    });
}
// export const addNewProduct: = (
//     enName,
//     arName,
//     unitPrice,
//     categoryId,
//     defaultQuantityId,
//     enDescription,
//     arDescription,
//     isAvailableForPurchase,
//     thumbnailFile,
//     mainImageFile,
// )=>{
//     return axios.post
// }