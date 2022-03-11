import {PreCheck} from "../../../interfaces/payment.interface";

export interface PaymentModalProps {
    open: boolean;
    preCheck: PreCheck;
    onClose: () => void;
    onSuccessClose: () => void;
}