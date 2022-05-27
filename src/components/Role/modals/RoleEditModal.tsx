import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    Box, LinearProgress, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControlLabel, Switch} from "@mui/material";
import {IApiConfig} from "../../../httpService/httpService.interface";
import httpService, {HttpError} from "../../../httpService/httpService";
import {ApiUrl} from "../../../config";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";
import {RoleEditModalProps} from "./RoleEditModal.props";
import {RoleEditRequest, RoleEditResponse} from "../../../interfaces/role.interface";

interface validateFields {
    title: boolean;
    dailyLimit: boolean;
    monthlyLimit: boolean;
    percentage: boolean;
    payWithBonusSkip: boolean;
}

const RoleEditModal = ({open, bonus, onClose, onSuccessClose, ...restProps}: RoleEditModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [notValidateField, setNotValidateField] = useState<validateFields>({
        title: false,
        dailyLimit: false,
        monthlyLimit: false,
        percentage: false,
        payWithBonusSkip: false,
    });
    const [title, setTitle] = useState<string>("");
    const [dailyLimit, setDailyLimit] = useState<string>("");
    const [monthlyLimit, setMonthlyLimit] = useState<string>("");
    const [percentage, setPercentage] = useState<string>("");
    const [payWithBonusSkip, setPayWithBonusSkip] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const validate = (title === "" || dailyLimit === "" || monthlyLimit === "" || percentage === "") ;
        return validate;
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);
            const apiData: RoleEditRequest = {
                id: "dfs",
                name: title,
                description: "dsfsjfs",
            };

            const apiConfig: IApiConfig = {
                method: "PUT",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<RoleEditResponse>(apiConfig, `${ApiUrl}partner/bonus`);
            setLoading(false);
            // Show message
            dispatch(handleSnackbar({
                open: true,
                message: responseJson.reason,
                type: "success",
            }));
            onSuccessClose();
        } catch (error) {
            setLoading(false);
            if(error instanceof HttpError) {
                console.log(error.getErrorDetails());
                // Show message
                dispatch(handleSnackbar({
                    open: true,
                    message: error.getResponseErrorMessage(),
                    type: "error",
                }));
            }
        }
    }


    useEffect(() => {
        if (open) {
            setTitle(bonus.name);


            setNotValidateField({
                title: false,
                dailyLimit: false,
                monthlyLimit: false,
                percentage: false,
                payWithBonusSkip: false,
            });
        }
    }, [open]);

    return (
        <>
            {bonus &&
                <Dialog fullWidth={true} open={open} onClose={onClose} maxWidth="sm">
                    <DialogTitle sx={{ textAlign: "center" }}>Изменение бонуса</DialogTitle>
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
                                    onChange={(e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTitle(e.target.value)}
                                    error={notValidateField.title && title === ""}
                                    helperText={notValidateField.title && title === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, title: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, title: false}))}
                                />
                            </Box>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Дневной лимит"
                                    value={dailyLimit}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={(e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setDailyLimit(e.target.value)}
                                    error={notValidateField.dailyLimit && dailyLimit === ""}
                                    helperText={notValidateField.dailyLimit && dailyLimit === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, dailyLimit: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, dailyLimit: false}))}
                                />
                            </Box>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Месячный лимит"
                                    value={monthlyLimit}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={(e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMonthlyLimit(e.target.value)}
                                    error={notValidateField.monthlyLimit && monthlyLimit === ""}
                                    helperText={notValidateField.monthlyLimit && monthlyLimit === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, monthlyLimit: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, monthlyLimit: false}))}
                                />
                            </Box>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Процент"
                                    value={percentage}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={(e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPercentage(e.target.value)}
                                    error={notValidateField.percentage && percentage === ""}
                                    helperText={notValidateField.percentage && percentage === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, percentage: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, percentage: false}))}
                                />
                            </Box>
                            <Box mb={3}>
                                <FormControlLabel
                                    sx={{margin: 0}}
                                    control={
                                        <Switch
                                            checked={payWithBonusSkip}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPayWithBonusSkip(event.target.checked)}
                                            color="secondary"
                                        />
                                    }
                                    labelPlacement="start"
                                    label="Не начислять бонус при оплате бонусом"
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
                                    Изменить
                                </Button>
                            </Box>
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
    )
}

export default RoleEditModal;