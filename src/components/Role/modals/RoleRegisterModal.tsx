import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
// Material UI
import {
    Box, LinearProgress, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControlLabel, Switch} from "@mui/material";
// Icons
import { Add} from "@mui/icons-material";
import {RoleRegisterModalProps} from "./RoleRegisterModal.props";
import {IApiConfig} from "../../../httpService/httpService.interface";
import httpService, {HttpError} from "../../../httpService/httpService";
import {ApiUrl} from "../../../config";
import {BonusRegisterRequest, BonusRegisterResponse} from "../../../interfaces/bonus.interface";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";

interface validateFields {
    title: boolean;
}

const RoleRegisterModal = ({onSuccessClose, ...restProps}: RoleRegisterModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [notValidateField, setNotValidateField] = useState<validateFields>({
        title: false,
    });
    const [title, setTitle] = useState<string>("");

    const validateForm = (): boolean => {
        const validate = (title === "") ;
        return validate;
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // try {
        //     event.preventDefault();
        //     setLoading(true);
        //     const apiData: BonusRegisterRequest = {
        //         "name": title,
        //     };
        //
        //     const apiConfig: IApiConfig = {
        //         method: "POST",
        //         body: JSON.stringify(apiData),
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         },
        //     };
        //
        //     const responseJson = await httpService<BonusRegisterResponse>(apiConfig, `${ApiUrl}partner/bonus`);
        //     setLoading(false);
        //     setShow(false);
        //     // Show message
        //     dispatch(handleSnackbar({
        //         open: true,
        //         message: responseJson.reason,
        //         type: "success",
        //     }));
        //     onSuccessClose();
        // } catch (error) {
        //     setLoading(false);
        //     if(error instanceof HttpError) {
        //         console.log(error.getErrorDetails());
        //         // Show message
        //         dispatch(handleSnackbar({
        //             open: true,
        //             message: error.getResponseErrorMessage(),
        //             type: "error",
        //         }));
        //     }
        // }
    }

    useEffect(() => {
        if (!show) {
            setTitle("");

            setNotValidateField({
                title: false,
            });
        }
    }, [show]);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                endIcon={<Add />}
                onClick={() => setShow(true)}
            >
                Добавить роль
            </Button>
            <Dialog fullWidth={true} open={show} onClose={() => setShow(false)} maxWidth="sm">
                <DialogTitle sx={{ textAlign: "center" }}>Добавление роли</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Название"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTitle(e.target.value)}
                                error={notValidateField.title && title === ""}
                                helperText={notValidateField.title && title === "" ? "Поле обязательно для заполнения" : ""}
                                onBlur={event => setNotValidateField(prevState => ({...prevState, title: true}))}
                                onFocus={event => setNotValidateField(prevState => ({...prevState, title: false}))}
                            />
                        </Box>
                        {loading &&
                            <Box mb={3}>
                                <LinearProgress color="secondary"/>
                            </Box>
                        }
                        <Box  sx={{textAlign: "center"}}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={validateForm() || loading}
                            >
                                Добавить
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShow(false)} color="secondary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RoleRegisterModal;