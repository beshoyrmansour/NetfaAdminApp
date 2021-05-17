import axios from "../../api/axios";
import { TProduct, IGetSingleOrderItemsProductsReq, IToggleProductsReq, IDeleteProductsBulkReq, IDeleteProductReq, ProductsActionTypes } from "../../models/Products";
import END_POINTS from '../../api/endPoints';
import { TOGGLE_MODES, UI_FROM_MODE } from "../../models/configs";

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// // OPTIONS http://myaccount.blob.core.windows.net/mycontainer/myblockblob  HTTP/1.1  
// // Accept: */*  
// // Origin: www.contoso.com
// // axios.defaults.headers['Access-Control-Request-Method'] = ' GET';
// axios.defaults.headers['Origin'] = 'http://momentum21.surge.sh';
// axios.defaults.headers['Access-Control-Request-Headers'] = ' content-type, accept';
// axios.defaults.headers['Accept-Encoding'] = ' gzip, deflate  ';
// axios.defaults.headers['User-Agent'] = ' Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)';
// axios.defaults.headers['Content-Length'] = ' 0';
export const getSingleOrderItemsProducts: IGetSingleOrderItemsProductsReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.SINGLE_ORDER_ITEMS)
}

export const createOrUpdateSingleItemProduct = (mainImageFile: any, newProduct: TProduct, mode: UI_FROM_MODE) => {
    console.log({ newProduct, mainImageFile });
    return axios({
        method: mode !== UI_FROM_MODE.NEW ? 'put' : 'post',
        url: END_POINTS.SINGLE_ORDER_ITEMS + (mode !== UI_FROM_MODE.NEW ? `/${newProduct?.id}` : ''),

        data: {
            ...newProduct
        },
    })
    // UPLOAD MAIN IMAGE 
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
        console.log({
            payloadRes: res
        });

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