import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let lkThemeMode = null;
const isLkThemeMode = localStorage.getItem("loyalty-lk-theme-mode");

if(isLkThemeMode) {
    lkThemeMode = JSON.parse(isLkThemeMode).value;
}

interface  ThemeState {
    theme: string,
    menuType: string,
}

const initialState: ThemeState = {
    theme: isLkThemeMode ? lkThemeMode : "light",
    menuType: "initial",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        changeMenuType: (state, action: PayloadAction<string>) => {
            state.menuType = action.payload;
        },
    }
});

export const {changeMenuType, changeTheme} = themeSlice.actions;

export default themeSlice.reducer;