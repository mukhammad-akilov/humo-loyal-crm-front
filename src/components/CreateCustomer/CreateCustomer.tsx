import React, {useState, useEffect, useCallback} from "react";
import {Button, Skeleton, TextField, Typography, Paper, LinearProgress} from "@mui/material";
import { Box } from "@mui/system";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {CreateCustomerProps} from "./CreateCustomer.props";
import {ApiUrl, ProjectTitle} from "../../config";
import {IApiConfig} from "../../httpService/httpService.interface";
import httpService, {HttpError} from "../../httpService/httpService";
import {CreateCustomerRequest, Field, SendOtpRequest, SendOtpResponse} from "../../interfaces/customer.interface";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
import {useDispatch} from "react-redux";
import l_times from "lodash/times";
import {normalizePhoneNumber} from "../../utils/utils";
import sha256 from "crypto-js/sha256";
// Access
import CanAccess from "../CanAccess/CanAccess";
import CardLink from "../CardLink/CardLink";

interface FieldWithValue extends Field {
    value: string
}

const RenderField = (field: FieldWithValue): JSX.Element => {
    return (
        <div>{field.title}</div>
    )
}

const CreateCustomer = ({title = "Заголовок пустой"}: CreateCustomerProps): JSX.Element => {
    const dispatch = useDispatch();
    // Loading
    const [loadingFields, setLoadingFields] = useState<boolean>(false);
    const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
    const [loadingCreateCustomer, setLoadingCreateCustomer] = useState<boolean>(false);
    const [otp, setOtp] = useState<{sent: boolean, value: string}>({
        sent: false,
        value: ""
    });
    // Fields
    const [fields, setFields] = useState<FieldWithValue[]>([]);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, changeField: FieldWithValue): void => {
        const changedFields = fields.map((field: FieldWithValue) => field.req_key !== changeField.req_key ? field : {...field, value: event.target.value});
        setFields(changedFields);
    }

    const sendOtp = async (): Promise<void> => {
        try {
            setLoadingOtp(true);
            setOtp({...otp, sent: false});

            // Find phone number field and get the value
            const phoneNumber = fields.find((field: FieldWithValue) => field.req_key === "phone");

            if(!phoneNumber) {
                throw new Error("Номер телефона не найден");
            }

            const apiData: Partial<SendOtpRequest> = {
                phone: `${normalizePhoneNumber(phoneNumber.value)}`,
            };

            const apiConfig: IApiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<SendOtpResponse>(apiConfig, `${ApiUrl}send_otp`);
            setOtp({...otp, sent: true});
            dispatch(handleSnackbar({
                open: true,
                message: responseJson.reason,
                type: "success",
            }));
            setLoadingOtp(false);
        } catch (error) {
            setLoadingOtp(false);
            if(error instanceof HttpError) {
                console.log(error.getErrorDetails());
                // Show message
                dispatch(handleSnackbar({
                    open: true,
                    message: error.getResponseErrorMessage(),
                    type: "error",
                }));
            } else if(error instanceof Error) {
                // Show message
                dispatch(handleSnackbar({
                    open: true,
                    message: error.message,
                    type: "error",
                }));
            }
        }
    }

    const createCustomer = async (): Promise<void> => {
        try {
            setLoadingOtp(true);

            const apiData: Partial<CreateCustomerRequest> = {};

            for(const field of fields) {
                apiData[field.req_key] = field.value;
            }

            const hasSum = sha256(`${apiData.phone}${otp.value}`).toString();
            apiData.otp = otp.value
            apiData.hash_sum = hasSum;
            apiData.bonus_id = 1

            const apiConfig: IApiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<SendOtpResponse>(apiConfig, `${ApiUrl}create_customer`);

            dispatch(handleSnackbar({
                open: true,
                message: responseJson.reason,
                type: "success",
            }));
            setLoadingOtp(false);
        } catch (error) {
            setLoadingOtp(false);
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
        // Update title
        document.title = `${title} | ${ProjectTitle}`;

        const getFields = async (): Promise<void> => {
            try {
                setLoadingFields(true);

                const apiConfig: IApiConfig = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    },
                };

                const responseJson = await httpService<Field[]>(apiConfig, `${ApiUrl}get_fields/create_customer`);
                const fieldsWithValue: FieldWithValue[] = responseJson.map((field: Field) => ({...field, value: ""}))
                setFields(fieldsWithValue);
                setLoadingFields(false);
            } catch (error) {
                setLoadingFields(false);
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

        getFields();
    }, []);

    return (
    <>
        <Box my={4} sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Breadcrumbs currentLinkText={title} />
        <Box mb={3}>
            <Paper elevation={3} sx={{padding: "1.5rem", maxWidth: "500px", margin: "auto"}}>
                {loadingFields ?
                    <Box mb={3} sx={{display: "flex", gap: "15px", flexDirection: "column"}}>
                        {l_times(5).map((item, counter) => (
                            <Skeleton
                                key={item}
                                variant="rectangular"
                                animation="wave"
                                height={50}
                            />
                        ))}
                    </Box>
                    :
                    <Box mb={3}>
                        {fields.map((field: FieldWithValue) => (
                            <Box mb={3} key={field.req_key}>
                                <TextField
                                    variant="outlined"
                                    required={field.required}
                                    fullWidth
                                    label={field.title}
                                    name={field.req_key}
                                    value={field.value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, field)}
                                    // error={notValidateField.login && login === ""}
                                    // helperText={notValidateField.login && login === "" ? "Поле обязательно для заполнения" : ""}
                                    // onBlur={event => setNotValidateField(prevState => ({...prevState, login: true}))}
                                    // onFocus={event => setNotValidateField(prevState => ({...prevState, login: false}))}
                                />
                            </Box>
                        ))}
                    </Box>
                }
                {otp.sent &&
                    <Box mb={3}>
                        <TextField
                            variant="outlined"
                            required={true}
                            fullWidth
                            label="СМС-код"
                            value={otp.value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp({...otp, value: e.target.value})}
                            // error={notValidateField.login && login === ""}
                            // helperText={notValidateField.login && login === "" ? "Поле обязательно для заполнения" : ""}
                            // onBlur={event => setNotValidateField(prevState => ({...prevState, login: true}))}
                            // onFocus={event => setNotValidateField(prevState => ({...prevState, login: false}))}
                        />
                    </Box>
                }
                <Box mb={3} sx={{textAlign: "center"}}>
                    <CanAccess
                        accessType="action"
                        route="/create-customer"
                        actionId="4321"
                        component={
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={loadingOtp || loadingFields}
                                onClick={sendOtp}
                            >
                                Получить СМС-код
                            </Button>
                        }
                    />
                </Box>
                    {loadingOtp &&
                        <Box mb={3}>
                            <LinearProgress color="secondary" />
                        </Box>
                    }
                {otp.sent &&
                    <Box sx={{textAlign: "center"}}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={loadingOtp}
                            onClick={createCustomer}
                        >
                            Создать клиента
                        </Button>
                    </Box>
                }
            </Paper>
        </Box>
    </>
  );
};

export default CreateCustomer;
