import {Bonus} from "../../../interfaces/bonus.interface";

export interface BonusEditModalProps {
    open: boolean;
    bonus: Bonus
    onClose: () => void;
    onSuccessClose: () => void;
}