import React, {useState, useEffect} from "react";
import {CaptchaModalProps} from "./CaptchaModal.props";
import {useAppSelector} from "../../customHooks/redux";
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField, LinearProgress} from "@mui/material";
import {CaptchaState, handleCaptcha} from "../../store/slices/captchaSlice";
import {useDispatch} from "react-redux";

const CaptchaModal = ({}: CaptchaModalProps): JSX.Element => {
    const captchaState = useAppSelector(state => state.captcha);
    const dispatch = useDispatch();

    // Form validation
    const [notValidateField, setNotValidateField] = useState<{captchaCode: boolean}>({
        captchaCode: false,
    });
    const [captchaCode, setCaptchaCode] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const validate = (captchaCode === "" || submitting);
        return validate;
    };

    const resendRequest = async (): Promise<void> => {
        setSubmitting(true);
        const captchaDetails: CaptchaState = {
            show: true,
            resendRequest: true,
            code: captchaCode,
        }
        dispatch(handleCaptcha(captchaDetails));
    };

    useEffect(() => {
        if(captchaState.show) {
            setCaptchaCode("");
            setNotValidateField({
                captchaCode: false
            });
        }
    }, [captchaState.show]);

    useEffect(() => {
        setSubmitting(false);
    }, [captchaState.imageUrl]);

    return (
        <>
            {captchaState.show &&
                <Dialog
                    open={captchaState.show}
                    fullWidth={true}
                    maxWidth="sm"
                >
                    <DialogTitle sx={{textAlign: "center"}}>Введите код из картинки</DialogTitle>
                    <DialogContent>
                        {captchaState?.imageUrl &&
                            <Box mb={3}>
                                <Box
                                    component="img"
                                    src={captchaState.imageUrl}
                                    sx={{margin: "auto"}}
                                    alt="Captcha code"
                                />
                            </Box>
                        }
                        <Box mb={3}>
                            <TextField
                                required={true}
                                fullWidth={true}
                                id="captcha-code"
                                label="Введите код"
                                value={captchaCode}
                                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => (event.key === "Enter" && !validateForm()) ? resendRequest() : null}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCaptchaCode(event.target.value)}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                error={notValidateField.captchaCode && captchaCode === ""}
                                helperText={notValidateField.captchaCode && captchaCode === "" ? "Поле обязательно для заполнения" : ""}
                                onBlur={(event: React.FocusEvent<HTMLInputElement>) => setNotValidateField(prevState => ({...prevState, captchaCode: true}))}
                                onFocus={(event: React.FocusEvent<HTMLInputElement>) => setNotValidateField(prevState => ({...prevState, captchaCode: false}))}
                            />
                        </Box>
                        {submitting &&
                        <Box mb={2}>
                            <LinearProgress />
                        </Box>
                        }
                        <Box sx={{textAlign: "center"}}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={validateForm()}
                                onClick={resendRequest}
                            >
                                Отправить
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
};

export default React.memo(CaptchaModal);