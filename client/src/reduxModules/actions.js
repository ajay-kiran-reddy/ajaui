import * as CONSTANTS from './constants';

export  function StoreLoggedInUserDetails(payload) {
    return{
        value:payload,
        type:CONSTANTS.STORE_LOGGED_IN_USER_DETAILS
    }
}

export  function StoreSelectedMatchDetails(payload) {
    return{
        value:payload,
        type:CONSTANTS.SELECTED_MATCH_DETAILS
    }
}

export function StoreEditToDoUser(payload) {
    return{
        value:payload,
        type:CONSTANTS.EDIT_TODO_INFO
    }
}

export function showSignUpOrSignIn(payload) {
    return {
        value:payload,
        type:CONSTANTS.SHOW_SIGN_IN_OR_SIGN_UP
    }
}

export function storeAccessToken(payload) {
    return {
        value:payload,
        type:CONSTANTS.ACCESS_TOKEN
    }
}

export function storeUserProfile(payload) {
    return {
        value:payload,
        type:CONSTANTS.SELECTED_USER_PROFILE_ID
    }
}



