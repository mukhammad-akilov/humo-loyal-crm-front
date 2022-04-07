import {configureStore, createListenerMiddleware} from "@reduxjs/toolkit";
import userSliceReducer, {logout} from "./slices/userSlice";
import themeSliceReducer from "./slices/themeSlice";
import snackbarSliceReducer from "./slices/snackbarSlice";
import captchaSlice from "./slices/captchaSlice";
import {removeAuthDataFromLocalStorage} from "../utils/utils";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
        captcha: captchaSlice,
    }
})

store.subscribe(() => {
    const state = store.getState();
    if(!state.user.isAuth) {
        removeAuthDataFromLocalStorage();
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreSubscribeType = typeof store.subscribe;
export type StoreStateType = typeof  store.getState;