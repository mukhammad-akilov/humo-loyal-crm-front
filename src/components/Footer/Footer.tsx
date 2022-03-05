import React from 'react';
// React router
import {useLocation} from 'react-router-dom';
// Material UI
import {Box, Typography} from "@mui/material";
// Project settings
import {ProjectTitle} from "../../config";
// Images
import humoLogo from '../../assets/images/humo-white-logo.svg';
// Redux
import {useAppSelector} from "../../hooks/redux";

const Footer = (): JSX.Element | null => {

    const userSate = useAppSelector(state => state.user);
    const location = useLocation();

    if (userSate.isAuth || location.pathname === "/404") {
        return (
            <Box
                component="footer"
                sx={{
                    color: "#FFFFFF",
                    backgroundColor:(theme) => theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.primary.main,
                    marginTop: "auto",
                    padding: "16px 0",
                }}
            >
                <Box mb={2}>
                    <Box
                        component="img"
                        src={humoLogo}
                        alt="МДО Хумо"
                        sx={{ width: "220px", margin: "auto"}}
                    />
                </Box>
                <Box>
                    <Typography component="p" align="center">
                        {ProjectTitle} {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Box>
        );
    } else {
        return  null;
    }
};

export default  Footer;