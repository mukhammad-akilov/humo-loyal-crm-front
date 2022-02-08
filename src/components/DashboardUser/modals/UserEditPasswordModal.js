import React, {useState, useContext, useEffect} from 'react';
// Context API
import {StoreContext, SnackbarAlertContext} from '../../../store-deprecated/StoreContext';
// Material UI
import {Box, Button, Dialog, DialogTitle, DialogContent, CircularProgress, TextField, DialogActions} from "@material-ui/core";

const UserChangePassword = ({user, show, onClose, onSuccessClose, ...props}) =>  {
    const [store, setStore, , , httpService] = useContext(StoreContext);
    const [snackbarAlertStore, setSnackbarAlertStore] = useContext(SnackbarAlertContext);

    // Form validation
    const [notValidateField, setNotValidateField] = useState({
        password: false,
        repeatPassword: false,
    });
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        let validate = (password === "" || repeatPassword === "" || repeatPassword !== password);
        return validate;
    }


    const handleFormSubmit = async e => {
        setSubmitting(true);
        e.preventDefault();
        try {
            const jsonData = {
                "user_id": parseInt(user.id),
                "new_password": password,
            };

            const apiConfig = {
                method: "PUT",
                body: JSON.stringify(jsonData),
                headers: {},
            };

            const responseJson = await httpService(apiConfig, `${store.apiUrl}change_password`);
            setSubmitting(false);
            onSuccessClose();
            // Show message
            setSnackbarAlertStore({
                ...snackbarAlertStore,
                open: true,
                message: `Пароль успешно изменен`,
                type: "success",
            });
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            // Show message
            setSnackbarAlertStore({
                ...snackbarAlertStore,
                open: true,
                message: `Произошла ошбика во время изменения пароля`,
                type: "error"
            });
        }
    }

    const repeatPasswordHelperText = () => {
        let helperText = notValidateField.repeatPassword && repeatPassword === "" ? "Поле обязательно для заполнения" : "";
        if(notValidateField.repeatPassword && repeatPassword !== password && repeatPassword !== "") {
            helperText = "Пароли не совпадают";
        }
        return helperText;
    }

    useEffect(() => {
        // Reset validation
        setNotValidateField({
            password: false,
            repeatPassword: false,
        });
        // Reset input data
        setPassword("");
        setRepeatPassword("");
    }, [show]);

    return (
        <>
            {user &&
                <Dialog
                    fullWidth={true}
                    open={show}
                    onClose={onClose}
                    maxWidth="sm"
                >
                    <DialogTitle style={{textAlign: "center"}}>Изменение пароля ({user.name})</DialogTitle>
                    <DialogContent dividers>
                        <form onSubmit={handleFormSubmit}>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={notValidateField.password && password === ""}
                                    helperText={notValidateField.password && password === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, password: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, password: false}))}
                                />
                            </Box>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Повторите пароль"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    error={(notValidateField.repeatPassword && repeatPassword === "") || (notValidateField.repeatPassword && password !== repeatPassword)}
                                    helperText={repeatPasswordHelperText()}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, repeatPassword: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, repeatPassword: false}))}
                                />
                            </Box>
                            {submitting ?
                                <Box my={3} align="center">
                                    <CircularProgress />
                                </Box>
                                :
                                <Box my={3} align="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={validateForm()}
                                    >
                                        Изменить
                                    </Button>
                                </Box>
                            }
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="secondary" variant="contained">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}

export default UserChangePassword;