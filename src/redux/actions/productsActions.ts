import axios from "../../api/axios";
import { TProduct, IGetSingleOrderItemsProductsReq, IToggleProductsReq, IDeleteProductsBulkReq, IDeleteProductReq, ProductsActionTypes, IAddNewProductsReq, IEditProductsReq } from "../../models/Products";
import END_POINTS from '../../api/endPoints';
import { TOGGLE_MODES, UI_FROM_MODE } from "../../models/configs";

export const getSingleOrderItemsProducts: IGetSingleOrderItemsProductsReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.SINGLE_ORDER_ITEMS)
}

export const addNewSingleItemProduct: IAddNewProductsReq = (productData) => {
    return axios.post(`${END_POINTS.SINGLE_ORDER_ITEMS}`,
        { ...productData }
    )
}

export const editSingleItemProduct: IEditProductsReq = (productData, productId) => {
    return axios.put(`${END_POINTS.SINGLE_ORDER_ITEMS}/${productId}`,
        { ...productData }
    )
}

export const toggleProducts: IToggleProductsReq = (porductIds, productIsAvailableForPurchase) => {
    return axios.put(`${END_POINTS.SINGLE_ORDER_ITEMS}/${productIsAvailableForPurchase ? TOGGLE_MODES.DISABLE : TOGGLE_MODES.ENABLE}`,
        [...porductIds]
    )

}

export const deleteProductsBulk: IDeleteProductsBulkReq = (porductIds) => {
    const newIDs = porductIds.map((item: string) => parseInt(item, 10))
    return axios({
        method: 'DELETE',
        url: `${END_POINTS.SINGLE_ORDER_ITEMS}/SingleOrderItemsRange`,
        data: newIDs
    }
    )

}
export const deleteProduct: IDeleteProductReq = (porductId) => {
    return axios.delete(`${END_POINTS.SINGLE_ORDER_ITEMS}/${porductId}`)
}

export const loadSingleOrderItemsProducts: (dispatch: any) => void = (dispatch) => {
    getSingleOrderItemsProducts().then((res) => {
        if (res.status === 200) {
            dispatch({
                type: ProductsActionTypes.FETCH_ALL_PRODUCTS,
                payload: res.data.singleOrderItems
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