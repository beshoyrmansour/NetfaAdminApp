import axios from "../../api/axios";
import { IGetCustomersReq, IToggleCustomersReq, IDeleteCustomersBulkReq, IDeleteCustomerReq, UsersActionTypes, IAddNewCustomersReq, IEditCustomersReq } from "../../models/Users";
import END_POINTS from '../../api/endPoints';
import { TOGGLE_MODES, UI_FROM_MODE } from "../../models/configs";

export const getCustomers: IGetCustomersReq = (PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.CUSTOMERS)
}

export const addNewEmploye: IAddNewCustomersReq = (CustomerData) => {
    return axios.post(`${END_POINTS.CUSTOMERS}`,
        { ...CustomerData }
    )
}

export const editCustomer: IEditCustomersReq = (CustomerData, CustomerId) => {
    return axios.put(`${END_POINTS.CUSTOMERS}/${CustomerId}`,
        { ...CustomerData }
    )
}

export const toggleCustomers: IToggleCustomersReq = (CustomerIds, CustomerIsAvailableForPurchase) => {
    return axios.put(`${END_POINTS.CUSTOMERS}/${CustomerIsAvailableForPurchase ? TOGGLE_MODES.DISABLE : TOGGLE_MODES.ENABLE}`,
        [...CustomerIds]
    )

}

export const deleteCustomersBulk: IDeleteCustomersBulkReq = (porductIds) => {
    const newIDs = porductIds.map((item: string) => parseInt(item, 10))
    return axios({
        method: 'DELETE',
        url: `${END_POINTS.CUSTOMERS}/SingleOrderItemsRange`,
        data: newIDs
    }
    )

}
export const deleteCustomer: IDeleteCustomerReq = (CustomerId) => {
    return axios.delete(`${END_POINTS.CUSTOMERS}/${CustomerId}`)
}

export const loadCustomersList: (dispatch: any) => void = (dispatch) => {
    getCustomers().then((res) => {
        if (res.status === 200) {
            dispatch({
                type: UsersActionTypes.FETCH_ALL_CUSTOMERS,
                payload: res.data.customers
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