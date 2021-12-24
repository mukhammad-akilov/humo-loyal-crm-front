import {logoutCase} from "../components/Utils/utils";
import store from "../store/store";
import {logout} from "../store/actions/userActions";

let accessToken = () => JSON.parse(localStorage.getItem("loyalty-lk-auth"))?.accessToken;

const httpService = async (apiConfig, url) => {
    try {
        // Accept/send cookie
        console.log(localStorage.getItem("loyalty-lk-auth"))
        apiConfig.credentials = "include";
        apiConfig.headers.auth = "Bearer " + accessToken() || "";

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