import * as actions from "./actions/actionTypes";

let lkThemeMode = null;
const isLkThemeMode = localStorage.getItem("loyalty-crm-theme-mode");

if(isLkThemeMode) {
    lkThemeMode = JSON.parse(isLkThemeMode).value;
}

const  initialState = {
    theme: isLkThemeMode ? lkThemeMode : "light",
    menuType: "initial",
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload.theme
            };
        case actions.CHANGE_MENU_TYPE:
            return {
                ...state,
               menuType: action.payload.menuType
            };
        default:
            return state
    }
}

export default themeReducer;