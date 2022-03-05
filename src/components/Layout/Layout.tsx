import {LayoutProps} from "./Layout.props";
import {Container, Box} from "@mui/material";
// Redux
import {useAppSelector} from "../../hooks/redux";

const Layout = ({children}: LayoutProps): JSX.Element => {
    const userState = useAppSelector((state) => state.user);

    return (
        <>
            <Box
                component="main"
                sx={{
                    paddingBottom: userState.isAuth ? "50px" : 0,
                }}
            >
                <Container maxWidth={false}>
                    {children}
                </Container>
            </Box>
        </>

    );
};

export default Layout;