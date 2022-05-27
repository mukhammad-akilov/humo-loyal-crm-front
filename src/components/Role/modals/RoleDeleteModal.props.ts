import {Role} from "../../../interfaces/role.interface";

export interface RoleDeleteModalProps {
    open: boolean;
    role: Role;
    onClose: () => void;
    onSuccessClose: () => void;
}