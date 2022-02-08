import * as actions from "./actionTypes";
import httpService from "../../httpService/httpService";
import {ApiUrl} from "../../config";
import { handleSnackbar } from "./snackbarActions";

export const signInSuccess = (data) => {
    return {
        type: actions.SIGN_IN_SUCCESS,
        payload: data
    }
};

export const getUserInfo = () => {
    return  async dispatch => {
        try {
            dispatch(startLoadingUserInfo());
            const apiConfig = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            };

            const responseJson = await httpService(apiConfig, `${ApiUrl}get_me`);
            dispatch(signInSuccess(responseJson))
            dispatch(endLoadingUserInfo())
        } catch (error) {
            console.log(error);
            dispatch(
                handleSnackbar({
                  open: true,
                  message: error?.apiResponse?.reason,
                  type: "error",
                  position: {
                    vertical: "top",
                    horizontal: "center",
                  },
                })
              );
            dispatch(endLoadingUserInfo())
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