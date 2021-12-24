import {useState, useEffect} from 'react';
// Redux
import {useDispatch} from "react-redux";
import {handleSnackbar} from "../../store/actions/snackbarActions";
// Project settings
import {ProjectTitle, ApiUrl, MainUrl} from "../../config";
import httpService from "../../httpService/httpService";
// Material UI
import {Box, CircularProgress, Container, makeStyles, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography, IconButton, Switch} from "@material-ui/core";
// Icons
import {Security, Accessibility} from "@material-ui/icons";
// Modals
import UserRegisterModal from "./modals/UserRegisterModal";
import UserChangePassword from "./modals/UserEditPasswordModal";
import UserPermissionsModal from "./modals/UserPermissionsModal";
// Tooltip
import Tooltip from "../Tooltip/Tooltip";
// Breadcrumbs
import Breadcrumbs from "../Utils/Breadcrumbs";


const useStyles = makeStyles(theme => ({
    tableHead: {
        backgroundColor: theme.palette.secondary.main,
    },

    tableCell: {
        fontWeight: "bold",
        color: "white"
    },


    alertNoData: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        padding: "0.5rem",
    }
}));


const DashboardUsersList = ({title = "Заголовок пустой", ...props}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [usersList, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    // Modals
    const [openUserEditPasswordModal, setOpenUserEditPasswordModal] = useState(false);
    const [openUserPermissionsModal, setOpenUserPermissionsModal] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);

            const apiConfig = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            };

            const jsonResponse = await httpService(apiConfig, `${ApiUrl}user_lk`);
            setUsersList(jsonResponse);
            setLoading(false);

        } catch(error){
            console.log(error);
        }
    };

    const toggleUserStatus = async  (user, visibility) => {
        try {
            let toggleText = visibility ? "включить" : "отключить";
            let alertText = visibility ? "включен" : "отключен";

            let userWantsDelete = window.confirm(`Вы действительно хотите ${toggleText} пользователя "${user.login}"?`);
            if(userWantsDelete) {
                const apiData = {
                    user_id: parseInt(user.id),
                };

                const apiConfig = {
                    method: "POST",
                    body: JSON.stringify(apiData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const responseJson = await httpService(apiConfig, `${ApiUrl}unblock_admin_user?user=${user.id}`);
                // Show message
                dispatch(handleSnackbar({
                    open: true,
                    message: `Пользователь "${user.login}" успешно ${alertText}`,
                    type: "success"
                }));
                getUsers();
            }
        } catch (error) {
            console.log(error);
            // Show message
            dispatch(handleSnackbar({
                open: true,
                message: "Произошла ошибка во время изменения статуса",
                type: "error"
            }))
        }
    }

    useEffect(() => {
        document.title = `${title} | ${ProjectTitle}`;
        const getUsersInit = getUsers;
        getUsersInit();
    }, []);

    return(
        <>
            <Container maxWidth={false}>
                <Box my={4} style={{textAlign: "center"}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {title}
                    </Typography>
                </Box>
                <Breadcrumbs currentLinkText={title} />
                <Box mb={3}>
                    <UserRegisterModal closeModal={getUsers} />
                </Box>
                {loading ?
                    <Box style={{textAlign: "center"}} mt={3}>
                        <CircularProgress color="secondary"/>
                    </Box>
                    :
                    usersList.length > 0 ?
                        <>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small">
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>№</TableCell>
                                            <TableCell className={classes.tableCell}>Логин</TableCell>
                                            <TableCell className={classes.tableCell}>ФИО</TableCell>
                                            <TableCell className={classes.tableCell}>Статус</TableCell>
                                            <TableCell className={classes.tableCell}>Действия</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {usersList.map((user, counter) => (
                                            <TableRow hover key={user.id}>
                                                <TableCell>{counter + 1}</TableCell>
                                                <TableCell>{user.login}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={user.is_active}
                                                        onChange={event => toggleUserStatus(user, event.target.checked)}
                                                        value="checked"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography noWrap>
                                                        <Tooltip title="Изменить пароль">
                                                            <IconButton color="secondary" onClick={() => {setOpenUserEditPasswordModal(true); setSelectedUser(user)}}>
                                                                <Security />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Изменить доступы">
                                                            <IconButton color="secondary" onClick={() => {setOpenUserPermissionsModal(true); setSelectedUser(user)}}>
                                                                <Accessibility />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                        :
                        <Typography component="p" align="center" className={classes.alertNoData}>Нет пользователей ЛК</Typography>
                }
            </Container>
            <UserChangePassword
                user={selectedUser}
                show={openUserEditPasswordModal}
                onClose={() => setOpenUserEditPasswordModal(false)}
                onSuccessClose={() => {setOpenUserEditPasswordModal(false); getUsers()}}
            />
            <UserPermissionsModal
                user={selectedUser}
                show={openUserPermissionsModal}
                onClose={() => setOpenUserPermissionsModal(false)}
                onSuccessClose={() => {setOpenUserPermissionsModal(false); getUsers()}}
            />
        </>
    );
};

export default DashboardUsersList;