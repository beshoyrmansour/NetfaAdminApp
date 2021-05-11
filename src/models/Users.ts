
export type Location = {
    lng: string,
    lat: string,
}

export type Address = {
    country: string,
    city: string,
    name: string,
    buldingNumber: string,
    unitNumber: string,
    location: Location
}

export type User = {
    id: string,
    name: string,
    email: string,
    mobile: string,
    addresses: Address,

}

export enum UsersActionTypes {
    FETCH_ALL_USERS = "USERS__FETCH_ALL_USERS",
    FETCH_USER = "USERS__FETCH_USER",
    ADD_USER = "USERS__ADD_USER",
    REMOVE_USER = "USERS__REMOVE_USER",
    UPDATE_USER = "USERS__UPDATE_USER",
    SET_IS_LOADING_USERS = "USERS__SET_IS_LOADING_USERS",
}



// Action Generator for ADD
export const addProductType = (user: User) => {
    return {
        type: UsersActionTypes.ADD_USER,
        payload: user
    };
};

// Action Generator for Remove
export const removeProductType = (user: User) => {
    return {
        type: UsersActionTypes.REMOVE_USER,
        payload: user
    };
};
