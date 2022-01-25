import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SnackbarState {
    open: boolean,
    message: string,
    type: string,
    position?: {
        vertical: string,
        horizontal: string
    }
}

const initialState: SnackbarState = {
    open: false,
    message: "",
    type: "success",
    position: {
        vertical: "top",
        horizontal: "center",
    }
};

export const themeSlice = createSlice({
    name: "snackbar",
    initialState: initialState,
    reducers: {
        handleSnackbar: (state, action: PayloadAction<SnackbarState>) => {
            return {
                ...state,
                ...action.payload
            }
        },
    }
});

export const {handleSnackbar} = themeSlice.actions;

export default themeSlice.reducer;