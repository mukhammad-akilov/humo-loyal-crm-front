import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import  { SnackbarOrigin } from '@mui/material/Snackbar';
import {AlertColor} from "@mui/material";

interface SnackbarState {
    open: boolean,
    message?: string,
    type?: AlertColor,
    position?: SnackbarOrigin
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