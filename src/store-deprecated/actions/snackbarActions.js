import * as actions from "./actionTypes";

export const handleSnackbar = snackbar => {
    return {
        type: actions.HANDLE_SNACKBAR,
        payload: snackbar
    }
};