import React, {useEffect} from 'react';
// Redux
import {useSelector, useDispatch} from "react-redux";
// Project settings
import {ProjectTitle} from "../../config";
// Material UI
import {Box, Container, Typography,  Paper, Avatar} from '@mui/material';
// Images
import avatar from '../../assets/images/user.svg';
// Breadcrumbs
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
// TS props
import {ProfileProps} from "./Profile.props";

const Profile = ({title = "Заголовок пустой", ...props}: ProfileProps): JSX.Element => {
    // const dispatch = useDispatch();
    // const userState = useSelector(state => state.user);

    // useEffect(() => {
    //     document.title = `${title} | ${ProjectTitle}`;
    //     dispatch(getUserInfo(userState.role));
    // }, [dispatch]);

    return (
        <>
            <Container maxWidth={false}>
                <Box my={4} style={{textAlign: "center"}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {title}
                    </Typography>
                </Box>
                <Breadcrumbs currentLinkText={title} />
                <Box>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem 15px",
                            textAlign: "center"
                        }}
                    >
                        <Box mb={3}>
                            <Avatar
                                src={avatar}
                                sx={{
                                    width: "200px",
                                    height: "200px",
                                    margin: "auto",
                                    border: theme => `8px dashed ${theme.palette.primary.main}`,
                                }}
                            />
                        </Box>
                        <Box mb={1}>
                            <Typography component="h2" variant="h6">
                                {/*<strong>ФИО:</strong> {userState.fullName}*/}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
};

export default Profile;