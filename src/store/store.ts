import {configureStore, createListenerMiddleware} from "@reduxjs/toolkit";
import userSliceReducer, {logout} from "./slices/userSlice";
import themeSliceReducer from "./slices/themeSlice";
import snackbarSliceReducer from "./slices/snackbarSlice";
import captchaSlice from "./slices/captchaSlice";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
        captcha: captchaSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreSubscribeType = typeof store.subscribe;
export type StoreStateType = typeof  store.getState;