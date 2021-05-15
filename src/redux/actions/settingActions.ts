import axios from "../../api/axios";
import { TProduct } from "../../models/Products";
import END_POINTS from '../../api/endPoints';
import {
    IGetQuantitiesListReq,
    IAddNewQuantityReq,
    IDeleteQuantityReq
} from "../../models/Quantity";

export const getQuantitiesList: IGetQuantitiesListReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.QUANTITIES)
}

export const addNewQuantity: IAddNewQuantityReq = (enName, arName, value) => {
    return axios.post(END_POINTS.QUANTITIES, { enName, arName, value })
}

export const deleteQuantity: IDeleteQuantityReq = (quantity) => {
    return axios.delete(END_POINTS.QUANTITIES + `/${quantity.id}`)
}

