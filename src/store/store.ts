import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import {removeAuthDataFromLocalStorage} from "../components/Utils/utils";

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(() => {
    const state = store.getState();
    if(!state.user.isAuth) {
        removeAuthDataFromLocalStorage();
    }
});


export default store;

export type RootState = ReturnType<typeof rootReducer>
