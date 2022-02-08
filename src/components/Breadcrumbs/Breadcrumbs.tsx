import React from 'react';
// React Router
import { Link as RouterLink } from 'react-router-dom';
// Material UI
import {Box, Link, Breadcrumbs as BreadcrumbsComponent, Typography} from "@mui/material";
// Icons
import {NavigateNextOutlined} from '@mui/icons-material';
import {BreadcrumbsProps} from "./Breadcrumbs.props";

const Breadcrumbs = ({currentLinkText = "Заголовок пустой", ...props}: BreadcrumbsProps): JSX.Element =>  {

    return (
        <Box mb={4}>
            <BreadcrumbsComponent
                separator={<NavigateNextOutlined fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    color="inherit"
                    to="/"
                    component={RouterLink}
                    underline="hover"
                >
                    Главная
                </Link>
                <Typography color="textPrimary">{currentLinkText}</Typography>
            </BreadcrumbsComponent>
        </Box>
    );
};

export default Breadcrumbs;