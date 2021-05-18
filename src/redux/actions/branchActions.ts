import axios from "../../api/axios";
import END_POINTS from '../../api/endPoints';
import {
    IGetBranchesListReq,
    IAddNewBranchReq,
    IEditBranchReq,
    IDeleteBranchReq
} from "../../models/Branches";

export const getBranchesList: IGetBranchesListReq = () => {
    return axios.get(END_POINTS.BRANCHES)
}

export const addNewBranch: IAddNewBranchReq = (enName, arName, address) => {
    return axios.post(END_POINTS.CATEGORIES, { enName, arName, address })
}

export const editBranch: IEditBranchReq = (enName, arName, address, branchId) => {
    return axios.put(END_POINTS.CATEGORIES + `/${branchId}`, { enName, arName, address })
}

export const deleteBranch: IDeleteBranchReq = (branchId) => {
    return axios.delete(END_POINTS.CATEGORIES + `/${branchId}`)
}

