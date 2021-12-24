import React from 'react';
// Material UI
import {Tooltip as MaterialTooltip, styled, tooltipClasses} from '@mui/material';

const CustomTooltip = styled(({ className, ...props }) => (
    <MaterialTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));


const Tooltip = ({title, children, ...props}) => {
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