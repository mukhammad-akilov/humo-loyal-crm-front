import React, {useEffect} from 'react';
// Project settings
import {ProjectTitle} from "../../config";
// Material UI
import {Box, Container, Typography, Alert} from '@mui/material'
// Images
import image404 from '../../assets/images/404.png';
// Breadcrumbs
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {NotFoundProps} from "./NotFound.props";

const NotFound = ({title = "Заголовок пустой", ...props}: NotFoundProps): JSX.Element => {

    useEffect(() => {
        document.title = `${title} | ${ProjectTitle}`;
    }, []);

    return (
        <>
            <Container maxWidth={false}>
                <Box my={4} style={{textAlign: "center"}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                       {title}
                    </Typography>
                </Box>
               <Breadcrumbs currentLinkText={title} />
                <Box mb={3}>
                    <img src={image404} alt="image404" style={{margin: "auto"}} />
                </Box>
                <Box>
                    <Alert variant="filled" severity="error" className={`align-items-center justify-content-center`}>
                        По вашему запросу ничего не найдено
                    </Alert>
                </Box>
            </Container>
        </>
    )
};

export default NotFound;