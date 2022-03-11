import React, {useState} from "react";
import sha256 from "crypto-js/sha256";
import {CreatePaymentRequest, CreatePaymentResponse} from "../../../interfaces/payment.interface";
import {Box, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Button, LinearProgress} from "@mui/material";
import {IApiConfig} from "../../../httpService/httpService.interface";
import httpService, {HttpError} from "../../../httpService/httpService";
import {useDispatch} from "react-redux";
import {ApiUrl} from "../../../config";
import {handleSnackbar} from "../../../store/slices/snackbarSlice";
import {PaymentModalProps} from "./PaymentModal.props";


const PaymentModal = ({open: openDialog, preCheck, onSuccessClose, onClose}: PaymentModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0);
    const [bonusAmount, setBonusAmount] = useState<number>(0);

    const makePayment = async () => {
        try {
            setLoading(true);
            const hasSum = sha256(`${preCheck.customer_identifier}${amount.toFixed(2)}${bonusAmount.toFixed(2)}`).toString();

            const apiData: CreatePaymentRequest = {
                customer_identifier: preCheck.customer_identifier as string,
                amount: amount,
                pay_bonus_amount: bonusAmount,
                hash_sum: hasSum,
            };

            const apiConfig: IApiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<CreatePaymentResponse>(apiConfig, `${ApiUrl}create_payment`);
            dispatch(handleSnackbar({
                open: true,
                message: "Платёж успешно создан",
                type: "success",
            }));
            onSuccessClose();
        } catch (error: unknown) {
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

    return (
        <>
            {preCheck &&
                <Dialog
                    fullWidth={true}
                    open={openDialog}
                    onClose={onClose}
                    maxWidth="sm"
                >
                    <DialogTitle style={{textAlign: "center"}}>Создание платежа</DialogTitle>
                    <DialogContent dividers>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="price-amount"
                                label="Сумма"
                                name="price-amount"
                                value={amount}
                                onChange={event => setAmount(parseInt(event.target.value))}
                            />
                        </Box>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="bonus-amount"
                                label="Сумма бонуса"
                                name="bonus-amount"
                                value={bonusAmount}
                                onChange={event => setBonusAmount(parseInt(event.target.value))}
                            />
                        </Box>
                        {loading &&
                            <Box mb={3} sx={{textAlign: "center"}}>
                                <LinearProgress color="secondary" />
                            </Box>
                        }
                        <Box sx={{textAlign: "center"}}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={makePayment}
                                disabled={loading}
                            >
                                Создать платёж
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="secondary" variant="outlined">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default React.memo(PaymentModal);