import axios from "../../api/axios";
import { TProduct } from "../../models/Products";
import END_POINTS from '../../api/endPoints';
import {
    IGetQuantitiesListReq,
    IAddNewQuantityReq,
    IDeleteQuantityReq,
    IEditQuantityReq
} from "../../models/Quantity";
import { SettingActionTypes } from "../../models/Settings";

export const getQuantitiesList: IGetQuantitiesListReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.QUANTITIES)
}

export const addNewQuantity: IAddNewQuantityReq = (enName, arName, value) => {
    return axios.post(END_POINTS.QUANTITIES, { enName, arName, value })
}

export const editQuantity: IEditQuantityReq = (enName, arName, value, quantityId) => {
    return axios.put(END_POINTS.QUANTITIES + `/${quantityId}`, { enName, arName, value })
}

export const deleteQuantity: IDeleteQuantityReq = (quantity) => {
    return axios.delete(END_POINTS.QUANTITIES + `/${quantity.id}`)
}



export const loadQuantitiesList: (dispatch: any) => void = (dispatch) => {
    getQuantitiesList().then((res) => {
        if (res.status === 200) {
            dispatch({
                type: SettingActionTypes.FETCH_ALL_QUANTITIES,
                payload: res.data
            })
        }
    });
}