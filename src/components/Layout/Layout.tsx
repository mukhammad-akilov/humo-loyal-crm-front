import {LayoutProps} from "./Layout.props";
import {Container, Box} from "@mui/material";
// Redux
import {useAppSelector} from "../../customHooks/redux";
// React Router
import {useLocation} from "react-router-dom";

const disableXPaddingRoutes: string[] = [
    "/login",
];

const Layout = ({children}: LayoutProps): JSX.Element => {
    const userState = useAppSelector((state) => state.user);
    const location = useLocation();

    return (
        <>
            <Box
                component="main"
                sx={{
                    paddingBottom: userState.isAuth ? "50px" : 0,
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters={disableXPaddingRoutes.includes(location.pathname)}
                >
                    {children}
                </Container>
            </Box>
        </>

    );
};

export default Layout;