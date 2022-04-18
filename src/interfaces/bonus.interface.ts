interface ReasonResponse {
    reason: string
}

export interface Bonus {
    id: number;
    partner: string;
    name: string;
    daily_limit: number;
    month_limit: number;
    percentage: number;
    pay_with_bonus_skip: boolean;
}

export interface BonusesListResponse extends Bonus {

}

export interface BonusRegisterRequest {
    name: string;
    "daily_limit": number;
    "month_limit": number;
    "percentage": number;
    "pay_with_bonus_skip": boolean;
}

export interface BonusEditRequest extends BonusRegisterRequest {
    id: number;
}

export interface BonusRegisterResponse extends ReasonResponse {}