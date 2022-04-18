import React, {ReactFragment} from 'react';
// Material UI
import {Tooltip as MaterialTooltip, styled, tooltipClasses, TooltipProps as  MaterialTooltipProps} from '@mui/material';
import {TooltipProps} from "./Tooltip.props";

const CustomTooltip = styled(({ className, title, placement, ...props }: MaterialTooltipProps) => (
    <MaterialTooltip  arrow title={title} placement={placement} classes={{ popper: className }} {...props} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));


const Tooltip = ({title, children, ...props}: TooltipProps) => {
    return (
        <CustomTooltip
            arrow
            title={title}
            aria-label={title}
            placement="top"
            classes={tooltipClasses}
        >
            {children}
        </CustomTooltip>
    )
};

export default Tooltip;