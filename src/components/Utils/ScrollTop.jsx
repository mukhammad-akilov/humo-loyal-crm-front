import React from 'react';
// Material UI
import {Zoom, useScrollTrigger, Box} from '@mui/material';

const ScrollTop = props => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 400,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#body');
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
                bottom: theme => theme.spacing(3),
                right: theme => theme.spacing(3)}}
            >
                {children}
            </Box>
        </Zoom>
    );
};

export default ScrollTop;