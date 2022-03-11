export interface Field {
    title: string;
    req_exp: string;
    req_key: string;
    required: boolean;
}

export interface PreCheck {
    customer_identifier: string;
    amount: number;
    card_unit: string;
    customer_info: string;
}

export interface CreatePaymentRequest {
    customer_identifier: string;
    amount: number;
    pay_bonus_amount: number;
    hash_sum: string;
}

export interface CreatePaymentResponse {
    reason: string
}