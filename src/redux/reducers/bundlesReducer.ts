import { TProduct, ProductsActionType, ProductsActionTypes, ProductsReducerType } from "../../models/Products";

export const productsInitReducerState: ProductsReducerType = {
    products: [{
        arName: 'الإسم العربي لهذا منتنج',
        enName: 'English Name For this product',
        thumbnailBase64: '',
        unitPrice: 0,
        mainImageId: 0,
        categoryId: 0,
        defaultQuantityId: 0,
        enDescription: '',
        arDescription: '',
        isAvailableForPurchase: true,
        id: 0,
        addedDate: "",
        modifiedDate: "",
        quantityEnName: '',
        quantityValue: 0,
        quantityArName: '',
    }],
    selectedProduct: {},
    isLoadingSelectedProduct: true,
    isLoadingProducts: false,

}

export const bundlesReducer = (state: ProductsReducerType = productsInitReducerState, action: ProductsActionType) => {
    switch (action.type) {
        case ProductsActionTypes.SET_IS_LOADING_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: action.payload
            }
        case ProductsActionTypes.ADD_PRODUCT:
            console.log(ProductsActionTypes.ADD_PRODUCT, action.payload);
            return {
                ...state,
                isLoadingProducts: false,
                products: state.products.concat(action.payload)
            };

        case ProductsActionTypes.SET_SELECTED_PRODUCT:
            console.log(ProductsActionTypes.SET_SELECTED_PRODUCT, action.payload);
            return {
                ...state,
                isLoadingProducts: false,
                selectedProduct: action.payload
            };

        case ProductsActionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                selectedProduct: {
                    ...action.payload
                },
                isLoadingProducts: false,
                products: [...state.products.map((product: TProduct) => product.id === action.payload.id ? action.payload : product)]
            }

        case ProductsActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                products: [...state.products.filter((product: TProduct) => product.id !== action.payload.id)]
            }

        default:
            return state;
    }
};