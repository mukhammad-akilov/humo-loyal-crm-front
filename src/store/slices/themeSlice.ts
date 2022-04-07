import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material";

let lkThemeMode = null;
const isLkThemeMode = localStorage.getItem("loyalty-crm-theme-mode");

if(isLkThemeMode) {
    lkThemeMode = JSON.parse(isLkThemeMode).value;
}

interface  ThemeState {
    theme: PaletteMode | "system",
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
        changeTheme: (state, action: PayloadAction<PaletteMode>) => {
            state.theme = action.payload;
        },
        changeMenuType: (state, action: PayloadAction<string>) => {
            state.menuType = action.payload;
        },
    }
});

export const {changeMenuType, changeTheme} = themeSlice.actions;

export default themeSlice.reducer;