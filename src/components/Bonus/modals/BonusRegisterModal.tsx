import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    Box, LinearProgress, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControlLabel, Switch} from "@mui/material";
// Icons
import { Add} from "@mui/icons-material";
import {BonusRegisterModalProps} from "./BonusRegisterModal.props";
import {IApiConfig} from "../../../httpService/httpService.interface";
import httpService, {HttpError} from "../../../httpService/httpService";
import {ApiUrl} from "../../../config";
import {BonusRegisterRequest, BonusRegisterResponse} from "../../../interfaces/bonus.interface";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";

interface validateFields {
    title: boolean;
    dailyLimit: boolean;
    monthlyLimit: boolean;
    percentage: boolean;
    payWithBonusSkip: boolean;
}

const BonusRegisterModal = ({onSuccessClose, ...restProps}: BonusRegisterModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
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
            const apiData: BonusRegisterRequest = {
                "name": title,
                "daily_limit": parseInt(dailyLimit),
                "month_limit": parseInt(monthlyLimit),
                "percentage": parseInt(percentage),
                "pay_with_bonus_skip": payWithBonusSkip,
            };

            const apiConfig: IApiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<BonusRegisterResponse>(apiConfig, `${ApiUrl}partner/bonus`);
            setLoading(false);
            setShow(false);
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
        if (!show) {
            setTitle("");
            setDailyLimit("");
            setMonthlyLimit("");
            setPayWithBonusSkip(false);
            setPercentage("");

            setNotValidateField({
                title: false,
                dailyLimit: false,
                monthlyLimit: false,
                percentage: false,
                payWithBonusSkip: false,
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
                Добавить бонус
            </Button>
            <Dialog fullWidth={true} open={show} onClose={() => setShow(false)} maxWidth="sm">
                <DialogTitle sx={{ textAlign: "center" }}>Добавление бонуса</DialogTitle>
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
                                onChange={e => setTitle(e.target.value)}
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
                                onChange={e => setDailyLimit(e.target.value)}
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
                                onChange={e => setMonthlyLimit(e.target.value)}
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
                                onChange={e => setPercentage(e.target.value)}
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

export default BonusRegisterModal;