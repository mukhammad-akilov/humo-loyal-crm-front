import * as actions from "./actions/actionTypes";

let userAuth = null;
const isUserAuth = localStorage.getItem("loyalty-lk-auth");

if(isUserAuth) {
    userAuth = JSON.parse(isUserAuth).accessToken;
}


const  initialState = {
    // isAuth: userAuth ? userAuth : false,
    isAuth: true,
    userInfo: null,
    loadingInfo: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userInfo: action.payload
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
                userInfo: null,
                loadingInfo: false,
            };
        default:
            return state
    }
}

export default userReducer;