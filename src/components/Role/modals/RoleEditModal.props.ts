import {Role} from "../../../interfaces/role.interface";

export interface RoleEditModalProps {
    open: boolean;
    bonus: Role;
    onClose: () => void;
    onSuccessClose: () => void;
}