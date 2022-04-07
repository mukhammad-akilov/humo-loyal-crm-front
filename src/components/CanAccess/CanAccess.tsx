import React from "react";
import {CanAccessProps} from "./CanAccess.props";
import {canVisitPage, canDoAction} from "../../utils/utils";
import {useAppSelector} from "../../customHooks/redux";
import {Navigate} from "react-router-dom";

export enum AccessStatus {
    Active = "ACTIVE",
    Disabled = "DISABLED",
    Hidden = "HIDDEN"
}

const CanAccess = ({accessType, route, actionId, redirectIfNoAccessRoute, component}: CanAccessProps): JSX.Element | null => {
    // Get user state from store
    const userState = useAppSelector(state => state.user);

    // Check if permissions are fetched
    if(userState.permissions) {
        if (accessType === "page") {
            const accessResult: AccessStatus = canVisitPage(userState.permissions, route);
            switch (accessResult) {
                case AccessStatus.Active:
                    return <>{component}</>
                case AccessStatus.Disabled:
                    if(redirectIfNoAccessRoute) {
                        return  <Navigate to={redirectIfNoAccessRoute} />
                    }
                    if (React.isValidElement(component)) {
                        return React.cloneElement(component, {disabled: true});
                    }
                    return <>{component}</>
                case AccessStatus.Hidden:
                    if(redirectIfNoAccessRoute) {
                        return  <Navigate to={redirectIfNoAccessRoute} />
                    }
                    return null;
                default:
                    return null;
            }
        } else if (accessType === "action") {
            const accessResult: AccessStatus = canDoAction(userState.permissions, route, actionId!);
            switch (accessResult) {
                case AccessStatus.Active:
                    return <>{component}</>
                case AccessStatus.Disabled:
                    if (React.isValidElement(component)) {
                        return React.cloneElement(component, {disabled: true});
                    }
                    return <>{component}</>
                case AccessStatus.Hidden:
                    return null;
                default:
                    return null;
            }
        }
    }
    return null;
}

export default CanAccess;