import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ApiUrl} from "../config";
import httpService from "../httpService/httpService";

let userAuth = null;
const isUserAuth = localStorage.getItem("crm-auth");

if(isUserAuth) {
    userAuth = JSON.parse(isUserAuth).value;
}

interface UserState {
    isAuth: boolean,
    fullName: string,
    loadingInfo: boolean,
    fetchError: null | string
}

const initialState: UserState = {
    isAuth: userAuth ? userAuth : false,
    fullName: "",
    loadingInfo: false,
    fetchError: null
};

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (userId: string, thunkAPI) => {
        try {
            const apiConfig = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            };

            const responseJson = await httpService(apiConfig, `${ApiUrl}get_me`);
            return responseJson;
        } catch (error) {
            console.log("Error while fetching user info", error);
            // return error;
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
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.isAuth = true;
            state.fullName = action.payload;
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

export const {signInSuccess, startLoadingUserInfo,endLoadingUserInfo, setUserInfo, logout} =  userSlice.actions;

export default userSlice.reducer;