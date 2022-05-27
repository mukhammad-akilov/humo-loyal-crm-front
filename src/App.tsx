import React, { Suspense, useEffect, useMemo } from "react";
// Styles
import "./App.scss";
// Redux
import { useDispatch } from "react-redux";
import {fetchUserInfo} from "./store/slices/userSlice";
// Lazy components
import { Login, Home, Profile, CreatePayment, CreateCustomer, BonusesList } from "./components/Lazy/Lazy";
import NotFoundRoute from "./routes/not-found";
// React router
import { Route, Routes, Navigate} from "react-router-dom";
// Routes type
import GuestRoute from "./components/Routes/GuestRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
// Layout
import Layout from "./components/Layout/Layout";
// Navbar
import Navbar from "./components/Navbar/Navbar";
// Footer
import Footer from "./components/Footer/Footer";
// Scroll to top
import ScrollTop from "./components/ScrollToTop/ScrollToTop";
// Material UI
import { CssBaseline, Fab, createTheme, ThemeProvider, Box, useMediaQuery } from "@mui/material";
import { ruRU } from "@mui/material/locale";
// Icons
import { KeyboardArrowUpOutlined } from "@mui/icons-material";
// Snackbar alert
import SnackbarAlert from "./components/SnackbarAlert/SnackbarAlert";
// Suspense fallback
import SuspenseFallback from "./components/SuspenseFallback/SuspenseFallback";
// Utils
import { handleSystemTheme } from "./utils/utils";
import {ProjectTheme} from "./config";
// Redux
import {useAppSelector} from "./customHooks/redux";
// Captcha modal
import CaptchaModal from "./components/CaptchaModal/CaptchaModal";
import PermissionsModal from "./components/PermissionsModal/PermissionsModal";
import RolesList from "./components/Role/RolesList";

const App = (): JSX.Element => {
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
              main: ProjectTheme.primary.color,
              contrastText: ProjectTheme.primary.textColor,
            },

            secondary: {
              main: ProjectTheme.secondary.color,
              contrastText: ProjectTheme.secondary.textColor,
            },
          },
        },
        ruRU
      ),
    [settingsState.theme, prefersDarkMode]
  );

  useEffect(() => {
    console.log("Run only once");
    if(userState.isAuth) {
      dispatch(fetchUserInfo());
    }
  }, [userState.isAuth]);

  return (
    <Box
        className="crm-test-class"
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
          <Layout>
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile title="Мой профиль"/></PrivateRoute>} />
              <Route path="/create-payment" element={<PrivateRoute><CreatePayment title="Создание платежа"/></PrivateRoute>} />
              <Route path="/create-customer" element={<PrivateRoute><CreateCustomer title="Создание клиента"/></PrivateRoute>} />
              <Route path="/bonuses" element={<PrivateRoute><BonusesList title="Список бонусов"/></PrivateRoute>} />
              <Route path="/roles" element={<PrivateRoute><RolesList title="Список ролей и прав"/></PrivateRoute>} />
              <Route path="/404" element={<NotFoundRoute title="Страница 404" />} />
              <Route path="*" element={<Navigate to="/404" />}  />
            </Routes>
          </Layout>
        </Suspense>
        <Footer />
        <ScrollTop>
          <Fab color="primary" size="large" aria-label="scroll back to top">
            <KeyboardArrowUpOutlined sx={{ color: "#FFFFFF" }} />
          </Fab>
        </ScrollTop>
        <SnackbarAlert />
        <CaptchaModal />
        <PermissionsModal />
      </ThemeProvider>
    </Box>
  );
};

export default App;
