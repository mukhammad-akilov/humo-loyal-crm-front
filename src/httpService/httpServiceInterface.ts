interface IApiConfigHeaders {
    [key: string]: string
}

export interface IApiConfig {
    method: string;
    headers: IApiConfigHeaders;
    url?: string;
    credentials?: RequestCredentials;
    body?: BodyInit;
    signal?: AbortSignal;
    hashKey?: string;
    uuid?: string;
    title?: string;
    func?: () => void;
}