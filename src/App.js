import React, {Suspense, useEffect, useMemo} from 'react';
// Redux
import {useSelector, useDispatch} from "react-redux";
// Redux actions
import {getUserInfo} from "./store/actions/userActions";
// Lazy components
import {Login, Home,  NotFound, Profile, CreatePayment } from "./components/Lazy/Lazy";
// React router
import {Route, Switch, Redirect} from 'react-router-dom';
// Routes type
import GuestRoute from './components/Routes/GuestRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
// Styles
import './App.scss';
// Navbar
import Navbar from "./components/Navbar/Navbar";
// Footer
import Footer from "./components/Footer/Footer";
// Scroll to top
import ScrollTop from "./components/Utils/ScrollTop";
// Material UI
import {CssBaseline, Fab, createTheme, ThemeProvider, Box, useMediaQuery} from "@mui/material";
import { ruRU } from '@mui/material/locale';
// Icons
import {KeyboardArrowUpOutlined} from '@mui/icons-material';
// Snackbar alert
import SnackbarAlert from "./components/Utils/SnackbarAlert";
// Suspense fallback
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback";
// Utils
import {handleSystemTheme} from "./components/Utils/utils";
// httpService
import httpService from "./httpService/httpService"
import { ApiUrl } from './config';


const App = props => {
  const dispatch = useDispatch();
  const settingsState = useSelector(state => state.theme);
  const userState = useSelector(state => state.user);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const customTheme = useMemo(
      () =>
          createTheme({
            palette: {
              mode: settingsState.theme === "system" ? handleSystemTheme() : settingsState.theme,
              primary:{
                  main: "#00617F",
                  contrastText: '#FFFFFF',
              },

              secondary: {
                  main: "#FF6600",
                  contrastText: '#FFFFFF',
              },
            },
          }, ruRU),[settingsState.theme, prefersDarkMode],
  );


  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        }}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Navbar />
          <Suspense fallback={<SuspenseFallback />}>
            <Box
                component="main"
                sx={{
                  paddingBottom: userState.isAuth ? "50px" : 0
                }}
            >
              <Switch>
                <GuestRoute path="/login" exact>
                  <Login />
                </GuestRoute>
                <PrivateRoute path="/" exact>
                  <Home />
                </PrivateRoute>
                <PrivateRoute path="/profile" exact>
                  <Profile title="Мой профиль" />
                </PrivateRoute>
                <PrivateRoute path="/create-payment" exact>
                  <CreatePayment title="Создание платежа" />
                </PrivateRoute>
                <Route path="/404">
                  <NotFound title="Страница 404" />
                </Route>
                <Redirect to="/404" />
              </Switch>
            </Box>
          </Suspense>
          <Footer />
          <ScrollTop {...props}>
            <Fab color="primary" size="large" aria-label="scroll back to top">
              <KeyboardArrowUpOutlined style={{color: "white"}}/>
            </Fab>
          </ScrollTop>
          <SnackbarAlert />
        </ThemeProvider>
      </Box>
  );
};

export default App;
