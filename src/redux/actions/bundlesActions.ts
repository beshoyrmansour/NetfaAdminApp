import axios from "../../api/axios";
import END_POINTS from '../../api/endPoints';
import { IGetBundlesListReq } from "../../models/Bundles";

export const getBundlesList: IGetBundlesListReq = (AvailableForPurchaseOnly, PageNumber, PageSize, OrderBy) => {
    // https://netf-test.herokuapp.com/api/bundles?AvailableForPurchaseOnly=true&PageNumber=1&PageSize=10&OrderBy=categoryId
    return axios.get(END_POINTS.BUNDLE)
}
// GET /api​/bundles
// POST /api​/bundles
// GET /api​/bundles​/{bundleId}
// DELETE /api​/bundles​/{bundleId}
// PUT /api​/bundles​/{bundleId}
// POST /api​/bundles​/BundlessRange
// DELETE /api​/bundles​/BundlessRange
// POST /api​/bundles​/AddProductsToBundle
// POST /api​/bundles​/RemoveProductsFromBundle
// PUT /api​/bundles​/Enable
// PUT /api/bundles/Disable
