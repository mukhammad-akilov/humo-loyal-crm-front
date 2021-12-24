import {combineReducers} from "redux";
// Reducers
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";
import snackbarReducer from "./snackbarReducer";
import { paymentReducer } from "./paymentReducer";

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    payment: paymentReducer,
})


export default rootReducer;