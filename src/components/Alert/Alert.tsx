import {Alert as MaterialAlert} from "@mui/material";
import {AlertProps} from "./Alert.props";

const Alert = ({message}: AlertProps): JSX.Element => {
    return (
        <MaterialAlert />
    );
}

export default Alert;