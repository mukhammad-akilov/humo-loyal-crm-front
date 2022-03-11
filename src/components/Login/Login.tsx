import React, {useState, useEffect} from 'react';
// Redux
import {useDispatch} from "react-redux";
import {signInSuccess} from "../../store/slices/userSlice";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
import {useAppSelector} from "../../hooks/redux";
// Project settings
import {ProjectTitle, ApiUrl} from "../../config";
import httpService, {HttpError} from "../../httpService/httpService";
// Material UI
import {Button, TextField, Link, Paper, Box, Grid, Typography, IconButton, InputAdornment, LinearProgress, Avatar} from "@mui/material";
// Icons
import {Visibility, VisibilityOff, LockOutlined} from "@mui/icons-material";
// Images
import humoLogoWhite from '../../assets/images/humo-white-logo.svg';
import {IApiConfig} from "../../httpService/httpService.interface";
import {ILoginRequest, ILoginResponse} from "../../interfaces/login.interface";

const Copyright = (): JSX.Element => {
    return (
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
        >
            {'Все права защищены © '} <Link color="inherit" href="https://humo.tj/ru/" target="_blank">МДО Хумо</Link> {new Date().getFullYear()}.
        </Typography>
    );
};

const Login = (): JSX.Element =>  {
    const dispatch = useDispatch();
    const userState = useAppSelector(state => state.user);

    // Form validation
    const [notValidateField, setNotValidateField] = useState({
        login: false,
        password: false,
    });
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const validateForm = (): boolean => {
        const validate = (login === "" ||  password === "" || loading);
        return validate;
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault();
            setLoading(true);

            const apiData: ILoginRequest = {
                username: login.trim(),
                password: password.trim(),
            };

            const apiConfig: IApiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService<ILoginResponse>(apiConfig, `${ApiUrl}login`);

            // const responseJson = await httpService<string>(apiConfig, `${ApiUrl}login`);
            // TS type guard example
            // if(typeof responseJson !== "string" && "message" in responseJson ) {
            //     console.log(responseJson.message)
            // }

            // Save user data in local storage
            localStorage.setItem("loyalty-crm-user-auth", JSON.stringify({value: true}));
            localStorage.setItem("loyalty-crm-user-role", JSON.stringify({value: "admin"}));
            localStorage.setItem("loyalty-crm-user-access-token", JSON.stringify({value: responseJson.accessToken}));
            localStorage.setItem("loyalty-crm-user-refresh-token", JSON.stringify({value: responseJson.refreshToken}));
            // Update store
            dispatch(signInSuccess("ФИО пользователя"));
            dispatch(handleSnackbar({
                position: {
                    vertical: "top",
                    horizontal: "center",
                },
            }));
        } catch (error) {
            setLoading(false);
            if(error instanceof HttpError) {
                console.log(error.getErrorDetails());
                // Show message
                dispatch(handleSnackbar({
                    open: true,
                    message: error.getResponseErrorMessage(),
                    type: "error",
                    position: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                }));
            }
        }
    };

    useEffect(() => {
        document.title = `Вход | ${ProjectTitle}`;
    }, []);

    return (
        <>
            <Grid
                container
                component="main"
                sx={{ minHeight: '100vh'}}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        minHeight: "150px",
                    }}
                >
                   <Box my={2} sx={{width: "100%"}}>
                        <Box
                            component="img"
                            src={humoLogoWhite}
                            alt='МДО Хумо'
                            sx={{width: "50%", margin: "auto"}}
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    component={Paper}
                    elevation={6}
                    square
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                         sx={{
                            margin: (theme) => theme.spacing(8, 4),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                         }}
                    >
                        <Box mb={1}>
                            <Avatar
                                sx={{backgroundColor: (theme) => theme.palette.primary.main}}
                            >
                                <LockOutlined />
                            </Avatar>
                        </Box>
                        <Box mb={4}>
                            <Typography component="h1" variant="h5" align="center">
                                {ProjectTitle}
                                <br />
                                Вход в личный кабинет
                            </Typography>
                        </Box>
                        <form onSubmit={handleFormSubmit}>
                            <Box mb={3}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Логин"
                                    name="login"
                                    autoComplete="login"
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    label="Пароль"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    error={notValidateField.password && password === ""}
                                    helperText={notValidateField.password && password === "" ? "Поле обязательно для заполнения" : ""}
                                    onBlur={event => setNotValidateField(prevState => ({...prevState, password: true}))}
                                    onFocus={event => setNotValidateField(prevState => ({...prevState, password: false}))}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={event => event.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            {loading &&
                                <Box mb={3} sx={{textAlign: "center"}}>
                                    <LinearProgress color="secondary" />
                                </Box>
                            }
                            <Box mb={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={validateForm()}
                                >
                                    Войти
                                </Button>
                            </Box>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default  Login;