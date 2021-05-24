import { UI_FROM_MODE } from "../../models/configs";
import { SettingActionTypes, TSettingAction, TSettingReducer } from "../../models/Settings";
import { BranchesActionTypes } from "../../models/Branches";

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
    categoryActiveMode: UI_FROM_MODE.VIEW,

    branches: [],
    selectedBranch: {},
    isLoadingSelectedBranch: true,
    isLoadingBranches: true,
    branchActiveMode: UI_FROM_MODE.VIEW
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
        // BRANCHES

        case BranchesActionTypes.SET_IS_LOADING_BRANCHES:
            return {
                ...state,
                isLoadingBranches: action.payload
            }

        case BranchesActionTypes.SET_IS_LOADING_SELECTED_BRANCH:
            return {
                ...state,
                isLoadingSelectedBranch: action.payload
            }

        case BranchesActionTypes.FETCH_ALL_BRANCHES:
            return {
                ...state,
                isLoadingBranches: false,
                branches: action.payload
            }

        case BranchesActionTypes.SET_SELECTED_BRANCH:
            return {
                ...state,
                isLoadingSelectedBranch: false,
                selectedBranch: action.payload
            }

        case BranchesActionTypes.SET_BRANCH_ACTIVE_MODE:
            return {
                ...state,
                branchActiveMode: action.payload
            }


        default:
            return state;
    }
};