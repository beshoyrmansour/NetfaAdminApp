import axios from "../../api/axios";
import END_POINTS from '../../api/endPoints';
import { IDeleteImageReq, IGetImageReq, IUploadImageReq, IUpdateImageReq } from "../../models/Image";

export const getImage: IGetImageReq = (imageId) => {
    return axios.get(`${END_POINTS.IMAGES}/${imageId}`)
}

export const uploadImage: IUploadImageReq = (base64Data, name) => {
    return axios.post(`${END_POINTS.IMAGES}`, {
        base64Data,
        name,
    })
}

export const updateImage: IUpdateImageReq = (imageId, base64Data, name) => { 
    return axios.put(`${END_POINTS.IMAGES}/${imageId}`, {
        base64Data,
        name,
    })
}

export const deleteImage: IDeleteImageReq = (imageId) => {
    return axios.delete(`${END_POINTS.IMAGES}/${imageId}`)
}