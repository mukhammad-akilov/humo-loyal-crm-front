export interface UserInfoResponse {
    fullName: string;
    role: string;
}

interface UserRole {
    id: string;
    name: string;
    description: string;
}

interface ActionPermissions {
    code: string;
    name: string;
    status: string;
    route: string;
    method: string;
}

export interface UserPermissions {
    page: {
        code: string;
        name: string;
        status: string;
        actions: ActionPermissions[];
    }
}

export interface UserInfo {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    role: UserRole[];
    permissions: UserPermissions[];
}