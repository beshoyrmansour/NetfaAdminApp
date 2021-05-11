export type quantity = {
    quantityId?: number;
    quantityName: string;
    value?: number;
    id?: string;
};

export type Product = {
    enName: string;
    arName: string;
    thumbnailBase64: string;
    unitPrice: number;
    mainImageId: number;
    categoryId: number;
    defaultQuantityId: number;
    enDescription: string;
    arDescription: string;
    isAvailableForPurchase: boolean;
    id?: number;
    addedDate?: Date;
    modifiedDate?: Date;
    quantityEnName?: string;
    quantityValue?: number;
    quantityArName?: string;
};
// enName:string;
// arName:string;
// thumbnailBase64:string;
// unitPrice:number;
// isAvailableForPurchase:boolean;
// categoryId:long;
// enDescription:string;
// arDescription:string;
// mainImageId:number;
// mainImage:string;

// [Required] public string EnName { get; set; }
// [Required] public string ArName { get; set; }
// [Required] public string ThumbnailBase64 { get; set; }
// [Required] public decimal UnitPrice { get; set; }
// [DefaultValue(true)] public bool IsAvailableForPurchase { get; set; }
// public long CategoryId { get; set; }
// public string EnDescription { get; set; }
// public string ArDescription { get; set; }
// public long MainImageId { get; set; }
// public virtual Image MainImage { get; set; }




// Type of Actions allowed
export enum ProductsActionTypes {
    FETCH_ALL_PRODUCTS = "PRODUCT__FETCH_ALL_PRODUCTS",
    FETCH_PRODUCT = "PRODUCT__FETCH_PRODUCT",
    ADD_PRODUCT = "PRODUCT__ADD_PRODUCT",
    SET_SELECTED_PRODUCT = "PRODUCT__SET_SELECTED_PRODUCT",
    REMOVE_PRODUCT = "PRODUCT__REMOVE_PRODUCT",
    UPDATE_PRODUCT = "PRODUCT__UPDATE_PRODUCT",
    SET_IS_LOADING_PRODUCTS = "PRODUCT__SET_IS_LOADING_PRODUCTS",
}

export type ProductsActionType = {
    type: ProductsActionTypes;
    payload?: any;
};

// Action Generator for ADD
export const addProductType = (product: Product) => {
    return {
        type: ProductsActionTypes.ADD_PRODUCT,
        payload: product
    };
};

// Action Generator for Remove
export const removeProductType = (product: Product) => {
    return {
        type: ProductsActionTypes.REMOVE_PRODUCT,
        payload: product
    };
};


export type ProductsReducerType = {
    products: Product[],
    selectedProduct: Product | {},
    isLoadingSelectedProduct: boolean,
    isLoadingProducts: boolean,
};
