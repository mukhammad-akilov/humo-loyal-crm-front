import React from 'react';
// Material UI
import {Zoom, useScrollTrigger, Box, Theme} from '@mui/material';
import {ScrollToTopProps} from "./ScrollToTop.props";

const ScrollTop = ({children, window, ...props}: ScrollToTopProps): JSX.Element => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 400,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#body');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed',
                    bottom: (theme: Theme) => theme.spacing(3),
                    right: (theme: Theme) => theme.spacing(3)}}
            >
                {children}
            </Box>
        </Zoom>
    );
};

export default ScrollTop;