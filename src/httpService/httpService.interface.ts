interface IApiConfigHeaders {
    [key: string]: string
}

type HttpMethod =  "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IApiConfig {
    method: HttpMethod;
    headers: IApiConfigHeaders;
    credentials?: RequestCredentials;
    body?: BodyInit;
    signal?: AbortSignal;
    hashKey?: string;
    uuid?: string;
    title?: string;
    func?: () => void;
}

export interface IApiErrorResponse {
    statusCode: number,
    reason: string,
}