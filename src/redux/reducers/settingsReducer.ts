import { UI_FROM_MODE } from "../../models/configs";
import { SettingActionTypes, TSettingAction, TSettingReducer } from "../../models/Settings";

export const settingInitReducerState: TSettingReducer = {
    quantities: [],
    selectedQuantity: {},
    isLoadingSelectedQuantity: true,
    isLoadingQuantities: true,
    quantityActiveMode: UI_FROM_MODE.VIEW,

    categories: [],
    selectedCategory: {},
    isLoadingSelectedCategory: true,
    isLoadingCategories: true,
    categoryActiveMode: UI_FROM_MODE.VIEW
}

export const settingsReducer = (state: TSettingReducer = settingInitReducerState, action: TSettingAction) => {
    switch (action.type) {

        // CATEGORIES

        case SettingActionTypes.SET_IS_LOADING_CATEGORIES:
            return {
                ...state,
                isLoadingCategories: action.payload
            }

        case SettingActionTypes.SET_IS_LOADING_SELECTED_CATEGORY:
            return {
                ...state,
                isLoadingSelectedCategory: action.payload
            }

        case SettingActionTypes.FETCH_ALL_CATEGORIES:
            return {
                ...state,
                isLoadingCategories: false,
                categories: action.payload
            }

        case SettingActionTypes.SET_SELECTED_CATEGORY:
            return {
                ...state,
                isLoadingSelectedCategory: false,
                selectedCategory: action.payload
            }

        case SettingActionTypes.SET_CATEGORY_ACTIVE_MODE:
            return {
                ...state,
                categoryActiveMode: action.payload
            }

        // QUANTITIES

        case SettingActionTypes.SET_IS_LOADING_QUANTITIES:
            return {
                ...state,
                isLoadingQuantities: action.payload
            }

        case SettingActionTypes.SET_IS_LOADING_SELECTED_QUANTITY:
            return {
                ...state,
                isLoadingSelectedQuantity: action.payload
            }

        case SettingActionTypes.FETCH_ALL_QUANTITIES:
            return {
                ...state,
                isLoadingQuantities: false,
                quantities: action.payload
            }

        case SettingActionTypes.SET_SELECTED_QUANTITY:
            return {
                ...state,
                isLoadingSelectedQuantity: false,
                selectedQuantity: action.payload
            }

        case SettingActionTypes.SET_QUANTITY_ACTIVE_MODE:
            return {
                ...state,
                quantityActiveMode: action.payload
            }


        default:
            return state;
    }
};