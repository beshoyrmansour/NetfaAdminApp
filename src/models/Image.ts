import { AxiosResponse } from "axios";

export type TImage = {
    id: number;
    addedDate?: string;
    modifiedDate?: string;
    base64Data: string;
    name: string;
}
export interface IGetImageReq {
    (imageId: string): Promise<AxiosResponse>
}
export interface IUploadImageReq {
    (
        base64Data: string,
        name: string
    ): Promise<AxiosResponse>
}
export interface IUpdateImageReq {
    (
        imageId: string,
        base64Data: string,
        name: string
    ): Promise<AxiosResponse>
}
export interface IDeleteImageReq {
    (imageId: string): Promise<AxiosResponse>
}

