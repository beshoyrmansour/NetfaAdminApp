import axios from "../../api/axios";
import END_POINTS from '../../api/endPoints';
import { IGetCategoriesListReq, IAddNewCategoryReq, IEditCategoryReq, IDeleteCategoryReq } from "../../models/Categories";

export const getCategoriesList: IGetCategoriesListReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.CATEGORIES)
}

export const addNewCategory: IAddNewCategoryReq = (enName, arName) => {
    return axios.post(END_POINTS.CATEGORIES, { enName, arName })
}

export const editCategory: IEditCategoryReq = (enName, arName, categoryId) => {
    return axios.put(END_POINTS.CATEGORIES + `/${categoryId}`, { enName, arName })
}

export const deleteCategory: IDeleteCategoryReq = (category) => {
    return axios.delete(END_POINTS.CATEGORIES + `/${category.id}`)
}


