import axios from "../../api/axios";
import { IGetSingleOrderItemsProductsReq, TProduct } from "../../models/Products";
import END_POINTS from '../../api/endPoints';
import { UI_FROM_MODE } from "../../models/configs";


export const getSingleOrderItemsProducts: IGetSingleOrderItemsProductsReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    return axios.get(END_POINTS.SINGLE_ORDER_ITEMS)
}

export const createOrUpdateSingleItemProduct = (mainImageFile: any, newProduct: TProduct, mode: UI_FROM_MODE) => {
    console.log({ newProduct, mainImageFile });
    return axios({
        method: mode !== UI_FROM_MODE.NEW ? 'put' : 'post',
        url: END_POINTS.SINGLE_ORDER_ITEMS,
        data: {
            ...newProduct
        }
    })
    // UPLOAD MAIN IMAGE 
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