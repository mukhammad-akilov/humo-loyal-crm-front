import React, {useState, useEffect} from 'react';
// Redux
import {useDispatch, useSelector} from "react-redux";
import {signInSuccess} from "../../store-deprecated/actions/userActions";
import {handleSnackbar} from "../../store-deprecated/actions/snackbarActions";
import {useAppSelector} from "../../hooks/redux";
// Project settings
import {ProjectTitle, ApiUrl} from "../../config";
import httpService from "../../httpService/httpService";
// Material UI
import {Button, TextField, Link, Paper, Box, Grid, Typography,
     CircularProgress, IconButton, InputAdornment} from "@mui/material";
// Icons
import {Visibility, VisibilityOff} from "@mui/icons-material";
// Images
import humoLogo from '../../assets/images/humo-logo.svg';
import humoLogoWhite from '../../assets/images/humo-white-logo.svg';

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
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const validate = (login === "" ||  password === "" || loading);
        return validate;
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):  Promise<void> => {
        try {
            e.preventDefault();
            setLoading(true);

            const apiData = {
                username: login.trim(),
                password: password.trim()
            };

            const apiConfig = {
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            };

            const responseJson = await httpService(apiConfig, `${ApiUrl}login`);
            // Save client auth in local storage
            localStorage.setItem("loyalty-lk-auth", JSON.stringify({accessToken: responseJson.accessToken, refreshToken: responseJson.refreshToken}))
            // Update store-deprecated
            dispatch(signInSuccess({
                fullName: "ФИО",
                // role: responseJson["user-type"]
            }))
            dispatch(handleSnackbar({
                position: {
                    vertical: "top",
                    horizontal: "center",
                },
            }))
        } catch (error: any) {
            console.log("error", error);
            setLoading(false);
            // Show message
            dispatch(handleSnackbar({
                open: true,
                message: error.apiResponse.reason,
                type: "error",
                position: {
                    vertical: "bottom",
                    horizontal: "center",
                },
            }));
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
                    xs={false}
                    sm={6}
                    md={4}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        minHeight: "150px",
                    }}
                >
                   <Box my={2} style={{width: "100%"}}>
                        <img src={humoLogoWhite} alt='humo-logo-white' style={{width: "50%", margin: "auto",}} />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
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
                        {/* {userState.loadingInfo &&
                            <CircularProgress size={30}/>
                        } */}
                        <Box mb={3} className="w-100">
                            <Box
                                component="img"
                                src={humoLogo}
                                sx={{width: "50%", margin: "auto"}}
                            />
                        </Box>
                        <Box mb={3}>
                            <Typography component="h1" variant="h5" align="center">
                                Бонусная программа лояльности для бизнеса
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
                                    <CircularProgress size={30}/>
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