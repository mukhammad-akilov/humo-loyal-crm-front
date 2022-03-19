import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ApiUrl} from "../../config";
import httpService, {HttpError} from "../../httpService/httpService";
import {IApiConfig} from "../../httpService/httpService.interface";
import {IUserInfoResponse} from "../../interfaces/profile.interface";

let userAuth = null;
const isUserAuth = localStorage.getItem("loyalty-crm-user-auth");

if(isUserAuth) {
    userAuth = JSON.parse(isUserAuth).value;
}

enum Role {ADMIN, MERCHANT, MERCHANT_EMPLOYEE}

interface UserState {
    isAuth: boolean,
    fullName: string,
    loadingInfo: boolean,
    fetchError: null | string,
    role: Role
}

const initialState: UserState = {
    isAuth: userAuth ?? false, // Nullish coalescing operator
    fullName: "",
    loadingInfo: false,
    fetchError: null,
    role: Role.MERCHANT,
};

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (userId: string, thunkAPI) => {
        try {
            const apiConfig: IApiConfig = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            };
            const responseJson = await httpService<IUserInfoResponse>(apiConfig, `${ApiUrl}get_me`);
            return responseJson;
        } catch (error) {
            if(error instanceof HttpError) {
                console.log(error.getErrorDetails());
            }
            return thunkAPI.rejectWithValue('Возникла ошибка во время получения данных пользователя');
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signInSuccess: (state, action: PayloadAction<string>) => {
            state.isAuth = true;
            state.fullName = action.payload;
        },
        startLoadingUserInfo: (state) => {
            state.loadingInfo = true;
        },
        endLoadingUserInfo: (state) => {
            state.loadingInfo = false;
        },
        setUserInfo: (state, action: PayloadAction<string>) => {
            state.isAuth = true;
            state.fullName = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.fullName = "";
            state.loadingInfo = false;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.isAuth = true;
            state.fullName = action.payload.fullName;
            state.loadingInfo = false;
        });
        builder.addCase(fetchUserInfo.pending, (state, action) => {
            state.loadingInfo = true;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.loadingInfo = false;
            state.fetchError = action.payload as string;
        });
    }
});

export const {signInSuccess, setUserInfo, logout} =  userSlice.actions;

export default userSlice.reducer;