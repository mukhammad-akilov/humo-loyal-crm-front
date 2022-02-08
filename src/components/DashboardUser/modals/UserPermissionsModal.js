import React, {useState, useEffect, useContext} from 'react';
// Context API
import {StoreContext, SnackbarAlertContext} from "../../../store-deprecated/StoreContext";
// Material UI
import {Dialog, DialogTitle, DialogContent, Button, DialogActions, CircularProgress, Box, makeStyles, TableContainer, Paper,
    Table, TableHead, TableRow, TableCell, TableBody, Switch, IconButton, Typography, Container} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    tableHead: {
        backgroundColor: theme.palette.secondary.main,
    },

    tableCell: {
        fontWeight: "bold",
        color: "white"
    }
}));

const UserPermissionsModal = ({user, show, onClose, onSuccessClose, ...props}) => {
    const classes = useStyles();
    const [store, , , , httpService] = useContext(StoreContext);
    const [snackbarAlertStore, setSnackbarAlertStore] = useContext(SnackbarAlertContext);
    const [userPermissionsList, setUserPermissionsList] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const getPermissions =  async () => {
        try {
            setLoading(true);

            const apiConfig = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            };

            const responseJson = await httpService(apiConfig, `${store.apiUrl}user_preferences?user=${user.id}`);
            setUserPermissionsList(responseJson);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const togglePermissionStatus = async (permissionId, userId, visibility) => {
        try {
            let toggleText = visibility ? "включить" : "отключить";
            let alertText = visibility ? "включен" : "отключен";

            let userWantsChange = window.confirm(`Вы действительно хотите ${toggleText} доступ пользователю "${user.login}"?`);

            if(userWantsChange) {
                const apiData = {
                    id: parseInt(permissionId),
                    user_id: parseInt(user.id),
                };

                const apiConfig = {
                    method: "POST",
                    body: JSON.stringify(apiData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const responseJson = await httpService(apiConfig, `${store.apiUrl}user_preferences?user=${user.id}&id=${permissionId}`);
                // Show message
                setSnackbarAlertStore({
                    ...snackbarAlertStore,
                    open: true,
                    message: `Доступ  успешно ${alertText} пользователю "${user.login}"`,
                    type: "success"
                });
                getPermissions();
            }
        } catch (error) {
            console.log(error);
            // Show message
            setSnackbarAlertStore({
                ...snackbarAlertStore,
                open: true,
                message: "Произошла ошибка во время изменения доступа",
                type: "error"
            });
        }
    }

    useEffect(() => {
        if(show) {
            getPermissions();
        }
    }, [show]);

    return (
        <>
            {user &&
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={show}
                onClose={onClose}
            >
                <DialogTitle style={{textAlign: "center"}}>Изменение доступов пользователя ({user.name})</DialogTitle>
                <DialogContent dividers>
                    {loading ?
                        <Box align={"center"} mt={3}>
                            <CircularProgress color="secondary"/>
                        </Box>
                        :
                        userPermissionsList.length > 0 ?
                            <>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>№</TableCell>
                                                <TableCell className={classes.tableCell}>Доступ</TableCell>
                                                <TableCell className={classes.tableCell}>Статус</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userPermissionsList.map((permission, couunter) => (
                                                <TableRow hover key={permission.id}>
                                                    <TableCell>{couunter + 1}</TableCell>
                                                    <TableCell>{permission.name}</TableCell>
                                                    <TableCell>
                                                        <Switch
                                                            checked={permission.is_active}
                                                            onChange={event => togglePermissionStatus(permission.id, user.id, event.target.checked)}
                                                            value="checked"
                                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                            :
                            <Typography component="p"  align="center" className={classes.alertNoData}>Нет списка доступов</Typography>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            }
        </>
    )
}

export default UserPermissionsModal;