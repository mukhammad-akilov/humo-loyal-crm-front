import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer, {logout} from "./slices/userSlice";
import themeSliceReducer from "./slices/themeSlice";
import snackbarSliceReducer from "./slices/snackbarSlice";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
    }
})

export const {dispatch} = store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;