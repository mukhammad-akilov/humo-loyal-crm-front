import React, {useState, useEffect, useCallback} from "react";
import {CreatePaymentProps} from "./CreatePayment.props";
// Material UI
import {Box, TextField, Typography, Skeleton, Button, Grid, Alert} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {ApiUrl, ProjectTitle} from "../../config";
import httpService, {HttpError} from "../../httpService/httpService";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
import {useDispatch} from "react-redux";
import {IApiConfig} from "../../httpService/httpService.interface";
import {CreatePaymentRequest, CreatePaymentResponse, Field, PreCheck} from "../../interfaces/payment.interface";
import l_times from "lodash/times";
import PaymentModal from "./modals/PaymentModal";
import useHttpService from "../../customHooks/useHttpService";

interface FieldWithValue extends Field {
    value: string
}

interface PreCheckWithStatus extends PreCheck {
    preChecked: boolean;
    hasValue: boolean;
}

const CreatePayment = ({title = "Заголовок пустой", ...restProps}: CreatePaymentProps): JSX.Element => {

    const dispatch = useDispatch();
    // Loading
    const [loadingFields, setLoadingFields] = useState<boolean>(false);
    const [loadingPreCheck, setLoadingPreCheck] = useState<boolean>(false);
    const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
    // Fields
    const [fields, setFields] = useState<FieldWithValue[]>([]);
    const [preCheckInfo, setPreCheckInfo] = useState<Partial<PreCheckWithStatus>>({});
    // Modals
    const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
    // Fields by custom hook
    const apiConfig: IApiConfig = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    };
    const [customHookLoading, value, error] = useHttpService<Field[]>(apiConfig, `${ApiUrl}get_fields/precheck`, []);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, changeField: FieldWithValue): void => {
        // console.log(event.target.value, changeField);
        const changedFields = fields.map((field: FieldWithValue) => field.req_key !== changeField.req_key ? field : {...field, value: event.target.value});
        setFields(changedFields);
    }

    const preCheck = async () => {
        try {
            setLoadingPreCheck(true);

            let urlParams: string = "";
            // Combine URL params with JS Map object
            const urlParamsMap = new Map();
            for (const field of fields) {
                urlParamsMap.set(field.req_key, field.value);
            }

            urlParamsMap.forEach((value: string, key: string, map) => {
                urlParams = `${urlParams}?${key}=${value}`
            });


            const apiConfig: IApiConfig = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<PreCheck>(apiConfig, `${ApiUrl}pre_check${urlParams}`);
            setPreCheckInfo({...responseJson, preChecked: true, hasValue: true});
            setLoadingPreCheck(false);
        } catch (error) {
            setPreCheckInfo({preChecked: true, hasValue: false});
            setLoadingPreCheck(false);
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

                const responseJson = await httpService<Field[]>(apiConfig, `${ApiUrl}get_fields/precheck`);
                const fieldsWithValue: FieldWithValue[] = responseJson.map((field: Field) => ({...field, value: "2200000001"}))
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
           <Box my={4} style={{textAlign: "center"}}>
               <Typography variant="h4" component="h1">
                   {title}
               </Typography>
           </Box>
           <Breadcrumbs currentLinkText={title} />
           <Grid container spacing={2}>
               <Grid item md={6}>
                   {loadingFields ?
                       <Box mb={3} sx={{display: "flex", gap: "15px", flexDirection: "column"}}>
                           {l_times(5).map((item,counter) => (
                               <Skeleton
                                   key={item}
                                   variant="rectangular"
                                   animation="wave"
                                   height={35}
                               />
                           ))}
                       </Box>
                       :
                       <Box>
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
                                           onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, field)}
                                           // error={notValidateField.login && login === ""}
                                           // helperText={notValidateField.login && login === "" ? "Поле обязательно для заполнения" : ""}
                                           // onBlur={event => setNotValidateField(prevState => ({...prevState, login: true}))}
                                           // onFocus={event => setNotValidateField(prevState => ({...prevState, login: false}))}
                                       />
                                   </Box>
                               ))}
                           </Box>
                           <Box mb={3} sx={{textAlign: "center"}}>
                               <Button
                                   variant="outlined"
                                   color="secondary"
                                   disabled={loadingPreCheck || loadingFields}
                                   onClick={preCheck}
                               >
                                   Проверить
                               </Button>
                           </Box>
                       </Box>
                   }
               </Grid>
               <Grid item md={6}>
                   {loadingPreCheck ?
                       <Box mb={3} sx={{display: "flex", gap: "15px", flexDirection: "column"}}>
                           {l_times(4).map((item,counter) => (
                               <Skeleton
                                   key={item}
                                   variant="rectangular"
                                   animation="wave"
                                   height={35}
                               />
                           ))}
                       </Box>
                       :
                       <Box>
                           {(preCheckInfo.preChecked && preCheckInfo.hasValue) &&
                               <>
                                   <Box mb={3} style={{textAlign: "center"}}>
                                       <Alert severity="success">По таким данным можно создать платёж</Alert>
                                   </Box>
                                   <Box mb={3}>
                                       <Typography><Box component="span"
                                                        sx={{fontWeight: 700}}>ID:</Box> {preCheckInfo.customer_identifier}
                                       </Typography>
                                       <Typography><Box component="span"
                                                        sx={{fontWeight: 700}}>ФИО:</Box> {preCheckInfo.customer_info}
                                       </Typography>
                                       <Typography><Box component="span"
                                                        sx={{fontWeight: 700}}>Сумма:</Box>{preCheckInfo.amount} {preCheckInfo.card_unit}
                                       </Typography>
                                   </Box>
                                   <Box sx={{textAlign: "center"}}>
                                       <Button
                                           variant="outlined"
                                           color="secondary"
                                           disabled={false}
                                           onClick={() => setOpenPaymentModal(true)}
                                       >
                                           Создать платёж
                                       </Button>
                                   </Box>
                               </>
                           }
                           {(preCheckInfo.preChecked && !preCheckInfo.hasValue) &&
                               <>
                                   <Box mb={2} style={{textAlign: "center"}}>
                                       <Alert severity="error">По таким данным невозможно создать платёж</Alert>
                                   </Box>
                               </>
                           }
                           {!preCheckInfo.preChecked &&
                               <>
                                   <Box mb={2} style={{textAlign: "center"}}>
                                       <Alert severity="warning">Введите данные чтобы создать платёж</Alert>
                                   </Box>
                               </>
                           }
                       </Box>

                   }
               </Grid>
           </Grid>
           <PaymentModal
               open={openPaymentModal}
               preCheck={preCheckInfo as PreCheck}
               onSuccessClose={() => setOpenPaymentModal(false)}
               onClose={() => setOpenPaymentModal(false)}
           />
       </>
    )
}

export default CreatePayment;