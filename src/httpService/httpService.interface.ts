interface ApiConfigHeaders {
    [key: string]: string
}

type HttpMethod =  "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IApiConfig {
    method: HttpMethod;
    // headers: HeadersInit;
    headers: ApiConfigHeaders;
    credentials?: RequestCredentials;
    body?: BodyInit;
    signal?: AbortSignal;
    hashKey?: string;
    uuid?: string;
    title?: string;
    func?: () => void;
}

export interface ApiErrorResponse {
    reason: string,
}