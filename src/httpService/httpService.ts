import {store} from "../store/store";
import {IApiConfig, IApiErrorResponse} from "./httpService.interface";
import {logout} from "../store/slices/userSlice";
import {ApiUrl} from "../config";
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

export class HttpError extends Error {
    responseStatusCode: number;
    responseErrorMessage: string;

    constructor(message: string, responseStatusCode: number, responseErrorMessage: string  = "Ошибка не определена") {
        super(message);
        this.name = "HttpError";
        this.responseStatusCode = responseStatusCode;
        this.responseErrorMessage = responseErrorMessage;
    }

    getResponseStatusCode = (): number => {
        return this.responseStatusCode;
    }

    getResponseErrorMessage = (): string => {
        return this.responseErrorMessage;
    }

    getErrorDetails = (): string => {
        return `Message: ${this.message}. Status code: ${this.responseStatusCode}. Error message: ${this.responseErrorMessage}`;
    }
}


export const abortController = new AbortController();
const abortControllerSignal = abortController.signal;

const httpService = async <T>(apiConfig: IApiConfig, endpoint: string): Promise<T> => {
    try {
            // Accept / send cookies
            apiConfig.credentials = "include";
            // apiConfig.headers.auth = `Bearer ${getToken()}`;
            apiConfig.signal = abortControllerSignal;

            // Response settings
            let isResponseFile: boolean = false;
            let fileObjectUrl: string;
            let responseJson: T;
            let errorResponseJson: IApiErrorResponse;
            // Make request
            const response: Response = await fetch(`${endpoint}`, apiConfig);

            if(response.ok) {
                if(response.headers.get("Content-Type") === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    isResponseFile = true;
                    const blobFile: Blob = await response.blob();
                    fileObjectUrl = window.URL.createObjectURL(blobFile);
                    //TODO handle this area after improving TS experience
                    // Return unknown type for Generic
                    const fileObjectUrlUnknown: unknown = fileObjectUrl;
                    return fileObjectUrlUnknown as T;
                } else {
                    responseJson = await response.json();
                    return responseJson;
                }
            }
             else {
                errorResponseJson = await response.json();
                // Make logout
                if(response.status === 401 && logoutCase.includes(errorResponseJson.reason.toLocaleLowerCase())) {
                    store.dispatch(logout());
                }
                // Throw custom HTTP error
                const error = new HttpError("Возникла ошибка во время запроса на сервер", response.status, errorResponseJson.reason);
                throw error;
            }
        }
        catch (error) {
            if(error instanceof HttpError) {
                console.log(error.getErrorDetails());
            }
            throw error;
        }
};

export default httpService;