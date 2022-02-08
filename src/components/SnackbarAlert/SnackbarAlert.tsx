import React, {forwardRef}  from 'react';
// Redux
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
// Material UI
import {Snackbar} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({...props}): JSX.Element =>  {
    const dispatch = useDispatch();
    const snackbarState = useAppSelector(state => state.snackbar);

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(handleSnackbar({open: false}))
    };

    return (
        <Snackbar
            open={snackbarState.open}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
                vertical: snackbarState.position!.vertical,
                horizontal: snackbarState.position!.horizontal
            }}
        >
            <Alert onClose={handleCloseSnackbar} severity={snackbarState.type}>
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;