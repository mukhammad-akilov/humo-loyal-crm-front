import  {forwardRef}  from 'react';
// Redux
import {useSelector, useDispatch} from "react-redux";
import {handleSnackbar} from "../../store/actions/snackbarActions";
// Material UI
import {Snackbar, Alert as MuiAlert} from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({user, show, onClose, ...props}) =>  {
    const dispatch = useDispatch();
    const snackbarState = useSelector(state => state.snackbar);

    const handleCloseSnackbar = (event, reason) => {
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
                vertical: snackbarState.position.vertical,
                horizontal: snackbarState.position.horizontal
            }}
        >
            <Alert onClose={handleCloseSnackbar} severity={snackbarState.type}>
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;