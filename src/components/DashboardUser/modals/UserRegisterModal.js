import React, {useState, useContext, useEffect} from 'react';
// Context API
import {StoreContext, SnackbarAlertContext} from '../../../store-deprecated/StoreContext';
// Material UI
import {Box, Button, Dialog, DialogTitle, DialogContent, CircularProgress, TextField, DialogActions} from "@material-ui/core";
// Icons
import {Add} from "@material-ui/icons";

const UserRegisterModal = ({closeModal, ...props}) =>  {
    const [store, , , , httpService] = useContext(StoreContext);
    const [snackbarAlertStore, setSnackbarAlertStore] = useContext(SnackbarAlertContext);
    // Form validation
    const [notValidateField, setNotValidateField] = useState({
        login: false,
        fullName: false,
        password: false
    });
    const [login, setLogin] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        let validate = (login === "" || fullName === "" | password === "");
        return validate;
    }

    const handleFormSubmit = async e => {
        try {
            setSubmitting(true);
            e.preventDefault();
            const jsonData = {
                login: login,
                first_name: fullName,
                password: password,
            };

            const apiConfig = {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: {},
            };

            const responseJson = await httpService(apiConfig, `${store.apiUrl}create_user_admin`);
            setOpenModal(false);
            setSubmitting(false);
            // Show message
            setSnackbarAlertStore({
                ...snackbarAlertStore,
                open: true,
                message: "Пользователь админки успешно добавлен",
                type: "success"
            });
            closeModal();
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            // Show message
            setSnackbarAlertStore({
                ...snackbarAlertStore,
                open: true,
                message: error.apiResponse.reason,
                type: "success"
            });
        }
    }

    useEffect(() => {
        if(openModal) {
            setLogin("");
            setFullName("");
            setPassword("");
            // Reset validation
            setNotValidateField({
                login: false,
                firstName: false,
                password: false,
            });
        }
    }, [openModal]);


    return (
        <>
            <Button variant="contained" color="secondary" endIcon={<Add />} onClick={() => setOpenModal(true)}>
                Добавить пользователя
            </Button>
            <Dialog
                fullWidth={true}
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="sm"
            >
                <DialogTitle style={{textAlign: "center"}}>Создание нового пользователя ЛК</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Логин"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                error={notValidateField.login && login === ""}
                                helperText={notValidateField.login && login === "" ? "Поле обязательно для заполнения" : ""}
                                onBlur={event => setNotValidateField(prevState => ({...prevState, login: true}))}
                                onFocus={event => setNotValidateField(prevState => ({...prevState, login: false}))}
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="ФИО"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                error={notValidateField.fullName && fullName === ""}
                                helperText={notValidateField.fullName && fullName === "" ? "Поле обязательно для заполнения" : ""}
                                onBlur={event => setNotValidateField(prevState => ({...prevState, fullName: true}))}
                                onFocus={event => setNotValidateField(prevState => ({...prevState, fullName: false}))}
                            />
                        </Box>
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
                                    Добавить
                                </Button>
                            </Box>
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="secondary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserRegisterModal;