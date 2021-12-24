import * as actions from "./actionTypes";
export const changeTheme = (theme = "") => {
    // Save or change theme mode in LocalStorage
    localStorage.setItem("loyalty-lk-theme-mode", JSON.stringify({value: theme}));

    return {
        type: actions.CHANGE_THEME,
        payload: {
            theme: theme
        }
    }
};

export const changeMenuType = (type = "") => {
    return {
        type: actions.CHANGE_MENU_TYPE,
        payload: {
            menuType: type
        }
    }
};