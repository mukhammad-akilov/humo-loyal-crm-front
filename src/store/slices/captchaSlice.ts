import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface  CaptchaState {
    show: boolean;
    imageUrl?: string;
    resendRequest: boolean;
    code: string;
}

const initialState: CaptchaState = {
    show: false,
    resendRequest: false,
    code: ""
};

export const captchaSlice = createSlice({
    name: "captcha",
    initialState: initialState,
    reducers: {
        handleCaptcha: (state, action: PayloadAction<CaptchaState>) => {
           state.show = action.payload.show;
           state.imageUrl = action.payload.imageUrl;
           state.code = action.payload.code;
           state.resendRequest = action.payload.resendRequest;
        },
        handleCaptchaRequest: (state, action: PayloadAction<boolean>) => {
            state.resendRequest = action.payload;
        }
    }
});

export const {handleCaptcha, handleCaptchaRequest} = captchaSlice.actions;

export default captchaSlice.reducer;