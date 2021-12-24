import * as actions from "./actions/actionTypes";

let userAuth = null;
let userRole = null;
const isUserAuth = localStorage.getItem("loyalty-lk-auth");
const isUserRole = localStorage.getItem("user-role");

if(isUserAuth) {
    userAuth = JSON.parse(isUserAuth).value;
}

if (isUserRole) {
    userRole = JSON.parse(isUserRole).value
}

const  initialState = {
    isAuth: true,
    // isAuth: userAuth ? userAuth : false,
    fullName: "",
    role: userRole ? userRole : "",
    loadingInfo: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                fullName: action.payload.fullName,
                role: action.payload.role,
            };
        case actions.START_LOADING_USER_INFO:
            return {
                ...state,
                loadingInfo: true
            };
        case actions.END_LOADING_USER_INFO:
            return {
                ...state,
                loadingInfo: false,
            }
        case actions.SET_USER_INFO:
            return {
                ...state,
                isAuth: true,
                fullName: action.payload.fullName,
                role: action.payload.role,
            };
        case actions.LOGOUT:
            return {
                ...state,
                isAuth: false,
                fullName: "",
                role: "",
                loadingInfo: false,
            };
        default:
            return state
    }
}

export default userReducer;