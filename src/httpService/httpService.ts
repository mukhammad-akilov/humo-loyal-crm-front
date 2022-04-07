import {IApiConfig, ApiErrorResponse} from "./httpService.interface";
import {logoutCase} from "../utils/utils";
import {CaptchaState, handleCaptcha, handleCaptchaRequest} from "../store/slices/captchaSlice";
import {logout} from "../store/slices/userSlice";
import {Unsubscribe} from "@reduxjs/toolkit";
import {StoreStateType, AppDispatch as AppDispatchType, StoreSubscribeType} from "../store/store";
import {SendOtpRequest} from "../interfaces/customer.interface";

interface accessTokenConfig {
    accessToken: string;
}

// Injecting Redux Store to prevent
let unsubscribe: Unsubscribe;
let storeSubscribe: StoreSubscribeType;
let storeState: StoreStateType;
let storeDispatch: AppDispatchType;

export const injectStore = (_storeDispatch: AppDispatchType, _storeState: StoreStateType, _storeSubscribe: StoreSubscribeType): void => {
    storeDispatch = _storeDispatch;
    storeState = _storeState;
    storeSubscribe = _storeSubscribe;
}

const getToken = (): string => {
    const token = localStorage.getItem("loyalty-crm-user-access-token");
    if(token) {
        return JSON.parse(token).value;
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

const httpService = async <T>(apiConfig: IApiConfig, endpoint: string, abortController: AbortController = new AbortController(), captchaCode?: string): Promise<T> => {
    try {
            storeDispatch(handleCaptchaRequest(false));

            // Accept / send cookies
            // apiConfig.credentials = "include";
            // Add auth Bearer Token in header
            apiConfig.headers.auth = `Bearer ${getToken()}`;

            apiConfig.signal = abortController.signal;

            // Add captcha code (wrap in try catch block if error occurs)
            if (typeof captchaCode !== 'undefined' && apiConfig.body) {
                const requestBody: SendOtpRequest = JSON.parse(apiConfig.body as string);
                requestBody.verification_code = captchaCode;
                apiConfig.body = JSON.stringify(requestBody);
            }

            // Response settings
            let isResponseFile: boolean = false;
            let fileObjectUrl: string;
            let responseJson: T;
            let errorResponseJson: ApiErrorResponse;
            // Make request
            const response: Response = await fetch(`${endpoint}`, apiConfig);

            if(response.ok) {
                const captchaDetails: CaptchaState = {
                    show: false,
                    resendRequest:false,
                    code: "",
                }
                storeDispatch(handleCaptcha(captchaDetails));
                if(unsubscribe) {
                    unsubscribe();
                }

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
            } else {
                if(response.status === 429 && response.headers.get("Content-Type") === "image/png") {
                    // Handle Captcha (Too many requests)
                    const blobFile: Blob = await response.blob();
                    fileObjectUrl = window.URL.createObjectURL(blobFile);
                    isResponseFile = true;

                    const captchaDetails: CaptchaState = {
                        show: true,
                        imageUrl: fileObjectUrl,
                        resendRequest:false,
                        code: "",
                    }
                    storeDispatch(handleCaptcha(captchaDetails));

                    // Subscribe to store change
                    unsubscribe = storeSubscribe(async  () => {
                        const captchaState = storeState().captcha;
                        console.log("Listener", apiConfig);
                        if(captchaState.resendRequest === true) {
                            await httpService<T>(apiConfig, endpoint, abortController, captchaState.code);
                            return;
                        }
                    })

                    // Throw custom HTTP error
                    const error = new HttpError(
                        "Возникла ошибка во время запроса на сервер. Слишком много попыток.",
                        response.status,
                        "Возникла ошибка во время запроса на сервер. Слишком много попыток."
                    );
                    throw error;
                } else {
                    errorResponseJson = await response.json();
                    // Make logout
                    if(response.status === 403 && logoutCase.includes(errorResponseJson.reason.toLocaleLowerCase())) {
                        storeDispatch(logout());
                    }
                    // Throw custom HTTP error
                    const error = new HttpError("Возникла ошибка во время запроса на сервер", response.status, errorResponseJson.reason);
                    throw error;
                }
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