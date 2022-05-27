interface ReasonResponse {
    reason: string
}

export interface Role {
    id: string;
    name: string;
    description: string;
}

export interface RolesListResponse extends Role {

}

export interface RoleEditRequest {
    id: string;
    name: string;
    description: string;
}

export interface RoleEditResponse extends ReasonResponse {}