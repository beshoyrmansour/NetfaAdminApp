import { AxiosResponse } from "axios";
import axios from "../../api/axios";
import END_POINTS from '../../api/endPoints';
import {
    IGetBranchesListReq,
    IAddNewBranchReq,
    IEditBranchReq,
    IDeleteBranchReq,
    BranchesActionTypes
} from "../../models/Branches";

export const getBranchesList: IGetBranchesListReq = () => {
    return axios.get(END_POINTS.BRANCHES)
}

export const addNewBranch: IAddNewBranchReq = (enName, arName, address) => {
    return axios.post(END_POINTS.BRANCHES, {
        enBranchName: enName, arBranchName: arName, address: {
            addressTitle: address.addressTitle,
            buildingNumber: address.buildingNumber,
            streetName: address.streetName,
            neighbourhood: address.neighbourhood,
            state: address.state,
            unitNumber: address.unitNumber,
            floorNumber: address.floorNumber,
            latitude: address.latitude,
            longitude: address.longitude,
            recipientPhoneNumber: address.recipientPhoneNumber,
            nearestLandMark: address.nearestLandMark,

        }
    })
}
export const editBranch: IEditBranchReq = (enName, arName, address, branchId) => {
    return axios.put(END_POINTS.BRANCHES + `/${branchId}`, { enName, arName, address })
}

export const deleteBranch: IDeleteBranchReq = (branchId) => {
    return axios.delete(END_POINTS.BRANCHES + `/${branchId}`)
}

export const loadBranchesList: (dispatch: any) => void = (dispatch) => {
    getBranchesList().then((res: AxiosResponse) => {

        if (res.status === 200) {
            dispatch({
                type: BranchesActionTypes.FETCH_ALL_BRANCHES,
                payload: res.data
            })
        }
    })
}