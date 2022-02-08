import {ReactElement} from "react";

export interface ScrollToTopProps {
    children: ReactElement,
    window?: () => Window;
}