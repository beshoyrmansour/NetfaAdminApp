import axios from "../../api/axios";
import { TProduct, IGetSingleOrderItemsProductsReq, IToggleProductsReq, IDeleteProductsBulkReq, IDeleteProductReq } from "../../models/Products";
import { BundlesActionTypes } from "../../models/Bundles";
import END_POINTS from '../../api/endPoints';
import { TOGGLE_MODES, UI_FROM_MODE } from "../../models/configs";

export const getSingleOrderItemsProducts: IGetSingleOrderItemsProductsReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.BUNDLES)
}

export const createOrUpdateSingleItemProduct = (mainImageFile: any, newProduct: TProduct, mode: UI_FROM_MODE) => {
    console.log({ newProduct, mainImageFile });
    return axios({
        method: mode !== UI_FROM_MODE.NEW ? 'put' : 'post',
        url: END_POINTS.BUNDLES + (mode !== UI_FROM_MODE.NEW ? `/${newProduct?.id}` : ''),

        data: {
            ...newProduct
        },
    })
    // UPLOAD MAIN IMAGE 
}
export const toggleProducts: IToggleProductsReq = (porductIds, productIsAvailableForPurchase) => {
    return axios.put(`${END_POINTS.BUNDLES}/${productIsAvailableForPurchase ? TOGGLE_MODES.DISABLE : TOGGLE_MODES.ENABLE}`,
        [...porductIds]
    )

}

export const deleteProductsBulk: IDeleteProductsBulkReq = (porductIds) => {
    const newIDs = porductIds.map((item: string) => parseInt(item, 10))
    return axios({
        method: 'DELETE',
        url: `${END_POINTS.BUNDLES}/SingleOrderItemsRange`,
        data: newIDs
    }
    )

}
export const deleteProduct: IDeleteProductReq = (porductId) => {
    return axios.delete(`${END_POINTS.BUNDLES}/${porductId}`)
}

export const loadSingleOrderItemsProducts: (dispatch: any) => void = (dispatch) => {
    getSingleOrderItemsProducts().then((res) => {
        console.log({
            payloadRes: res
        });

        if (res.status === 200) {
            dispatch({
                type: BundlesActionTypes.FETCH_ALL_PRODUCTS,
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