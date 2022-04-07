import React from "react";

export interface CanAccessProps {
    accessType: "page" | "action";
    route: string;
    actionId?: string;
    redirectIfNoAccessRoute?: string;
    component: React.ReactNode;
}