interface ReasonResponse {
    reason: string
}

export interface Field {
    title: string;
    req_exp: string;
    req_key: string;
    required: boolean;
}

export interface SendOtpRequest {
    phone: string;
    verification_code?: string;
}

export interface SendOtpResponse extends ReasonResponse {}

export interface CreateCustomerRequest {
   [key: string]: string | number | boolean,
}

export interface CreateCustomerResponse extends ReasonResponse {}