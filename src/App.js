import React, { Suspense, useEffect, useMemo } from "react";
// Redux
import { useDispatch } from "react-redux";
// Redux actions
import { getUserInfo } from "./store/actions/userActions";
// Lazy components
import { Login, Home, NotFound, Profile, CreatePayment, CreateCutomer } from "./components/Lazy/Lazy";
// React router
import { Route, Routes, Navigate } from "react-router-dom";
// Routes type
import GuestRoute from "./components/Routes/GuestRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
// Styles
import "./App.scss";
// Navbar
import Navbar from "./components/Navbar/Navbar";
// Footer
import Footer from "./components/Footer/Footer";
// Scroll to top
import ScrollTop from "./components/Utils/ScrollTop";
// Material UI
import { CssBaseline, Fab, createTheme, ThemeProvider, Box, useMediaQuery } from "@mui/material";
import { ruRU } from "@mui/material/locale";
// Icons
import { KeyboardArrowUpOutlined } from "@mui/icons-material";
// Snackbar alert
import SnackbarAlert from "./components/Utils/SnackbarAlert";
// Suspense fallback
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback";
// Utils
import { handleSystemTheme } from "./components/Utils/utils";
// httpService
import httpService from "./httpService/httpService";
import { ApiUrl } from "./config";
import { useAppSelector } from "./components/hooks/redux";

const App = (props) => {
  const dispatch = useDispatch();
  const settingsState = useAppSelector((state) => state.theme);
  const userState = useAppSelector((state) => state.user);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const customTheme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: settingsState.theme === "system" ? handleSystemTheme() : settingsState.theme,
            primary: {
              main: "#00617F",
              contrastText: "#FFFFFF",
            },

            secondary: {
              main: "#FF6600",
              contrastText: "#FFFFFF",
            },
          },
        },
        ruRU
      ),
    [settingsState.theme, prefersDarkMode]
  );

  useEffect(() => {
    // dispatch(getUserInfo());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<SuspenseFallback />}>
          <Box
            component="main"
            sx={{
              paddingBottom: userState.isAuth ? "50px" : 0,
            }}
          >
            <Routes>
              <Route path="/login" element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile title="Мой профиль" />} />
              </Route>
              <Route path="/create-payment" element={<PrivateRoute />}>
                <Route path="/create-payment" element={<CreatePayment title="Создание платежа" />} />
              </Route>
              <Route path="/create-customer" element={<PrivateRoute />}>
                <Route path="/create-customer" element={<CreateCutomer title="Создание клиента" />} />
              </Route>
              <Route path="*" element={<NotFound title="Страница 404" />} />
            </Routes>
          </Box>
        </Suspense>
        <Footer />
        <ScrollTop {...props}>
          <Fab color="primary" size="large" aria-label="scroll back to top">
            <KeyboardArrowUpOutlined style={{ color: "white" }} />
          </Fab>
        </ScrollTop>
        <SnackbarAlert />
      </ThemeProvider>
    </Box>
  );
};

export default App;
