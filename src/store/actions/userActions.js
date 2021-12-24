import * as actions from "./actionTypes";
import httpService from "../../httpService/httpService";
import {ApiUrl} from "../../config";

export const signInSuccess = (user) => {
    return {
        type: actions.SIGN_IN_SUCCESS,
        payload: {
            fullName: user.fullName,
            role: user.role
        }
    }
};

export const getUserInfo = userType => {
    return  async dispatch => {
        try {
            dispatch(startLoadingUserInfo());
            const apiConfig = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            };

            const responseJson = await httpService(apiConfig, `${ApiUrl}about-me?user=${userType}`);
            dispatch(setUserInfo({
                fullName: responseJson["full_name"],
                role: responseJson["user-type"],
            }));
        } catch (error) {
            console.log(error);
            dispatch(endLoadingUserInfo());
        }
    }
};

export const setUserInfo = (user) => {
    return {
        type: actions.SET_USER_INFO,
        payload: {
            fullName: user.fullName,
            role: user.role
        }
    }
}
export const startLoadingUserInfo = () => {
    return {
        type: actions.START_LOADING_USER_INFO,
    }
};

export const endLoadingUserInfo = () => {
    return {
        type: actions.END_LOADING_USER_INFO,
    }
};

export const logout = (message = "") => {
    return {
        type: actions.LOGOUT,
        payload: {
            description: message
        }
    }
};