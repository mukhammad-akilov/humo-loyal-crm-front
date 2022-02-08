import store from "../store-deprecated/store";
import {IApiConfig} from "./httpServiceInterface";
// import {logout} from "../store-deprecated/actions/userActions";
import {logout} from "../store/slices/userSlice";
import {logoutCase} from "../utils/utils";

interface accessTokenConfig {
    accessToken: string;
}

const getToken = () => {

    if (localStorage.getItem("loyalty-lk-auth")) {
        let token: accessTokenConfig = JSON.parse(localStorage.getItem("loyalty-lk-auth") || ""); 
        return token?.accessToken;
    }

    return "";
    
}

export const abortController = new AbortController();
const abortControllerSignal = abortController.signal;

const httpService = async (apiConfig: IApiConfig, url: string) => {
    try {
        // Accept / send cookie
        apiConfig.credentials = "include";

        apiConfig.headers.auth = "Bearer " +  getToken();
        apiConfig.headers.auth = `Bearer " + ${getToken()}`;
        apiConfig.signal = abortControllerSignal;

        // Response settings
        let isResponseFile = false;
        let fileObjectUrl = "";
        let responseJson = null;
        // Make request
        const response = await fetch(url, apiConfig);

        if(response.headers.get("Content-Type") === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            isResponseFile = true;
            const blobFile = await response.blob();
            fileObjectUrl = window.URL.createObjectURL(blobFile);
        } else {
            responseJson = await response.json();
        }

        if (response.ok) {
            if(isResponseFile) {
                return fileObjectUrl;
            } else {
                return responseJson;
            }
        // } else if(response.status === 401 && logoutCase.includes(responseJson.message.toLocaleLowerCase())) {
        } else if(response.status === 403) {
            // Make logout
            store.dispatch(logout());
            const error = {
                message: "Возникла ошибка во время запроса на сервер",
                apiResponse: responseJson
            };

            throw error;
        } else {
            const error = {
                message: "Возникла ошибка во время запроса на сервер",
                apiResponse: responseJson
            };

            throw error;
        }
    } catch (error) {
        throw error;
    }
};

export default httpService;