import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "../features/userSlice";
import themeSliceReducer from "../features/themeSlice";
import snackbarSliceReducer from "../features/snackbarSlice";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;