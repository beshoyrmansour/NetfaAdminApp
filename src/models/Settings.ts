import { BranchesActionTypes, TBranch } from "./Branches";
import { TCategory } from "./Categories";
import { UI_FROM_MODE } from "./configs";
import { TQuantity } from "./Quantity";

export enum SettingActionTypes {
    FETCH_ALL_CATEGORIES = "CATEGORY__FETCH_ALL_CATEGORIES",
    SET_SELECTED_CATEGORY = "CATEGORY__SET_SELECTED_CATEGORY",
    SET_IS_LOADING_CATEGORIES = "CATEGORY__SET_IS_LOADING_CATEGORIES",
    SET_IS_LOADING_SELECTED_CATEGORY = "CATEGORY__SET_IS_LOADING_SELECTED_CATEGORY",
    SET_CATEGORY_ACTIVE_MODE = "CATEGORY__SET_ACTIVE_MODE",

    FETCH_ALL_QUANTITIES = "QUANTITY__FETCH_ALL_QUANTITIES",
    SET_SELECTED_QUANTITY = "QUANTITY__SET_SELECTED_QUANTITY",
    SET_IS_LOADING_QUANTITIES = "QUANTITY__SET_IS_LOADING_QUANTITIES",
    SET_IS_LOADING_SELECTED_QUANTITY = "QUANTITY__SET_IS_LOADING_SELECTED_QUANTITY",
    SET_QUANTITY_ACTIVE_MODE = "QUANTITY__SET_ACTIVE_MODE"
}

export type TSettingAction = {
    type: SettingActionTypes | BranchesActionTypes;
    payload?: any;
};

export type TSettingReducer = {
    quantities: TQuantity[];
    selectedQuantity: TQuantity | {};
    isLoadingSelectedQuantity: boolean;
    isLoadingQuantities: boolean;
    quantityActiveMode: UI_FROM_MODE;

    categories: TCategory[];
    selectedCategory: TCategory | {};
    isLoadingSelectedCategory: boolean;
    isLoadingCategories: boolean;
    categoryActiveMode: UI_FROM_MODE;

    branches: TBranch[];
    selectedBranch: TBranch | {};
    isLoadingSelectedBranch: boolean;
    isLoadingBranches: boolean;
    branchActiveMode: UI_FROM_MODE;
};
