import * as actions from "./actions/actionTypes";

const  initialState = {
    open: false,
    message: "",
    type: "success",
    position: {
        vertical: "top",
        horizontal: "center",
    }
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.HANDLE_SNACKBAR:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
}

export default snackbarReducer;