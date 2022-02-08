import React from "react";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../../store/slices/themeSlice";
import {useAppSelector} from "../../../hooks/redux";
// Material UI
import {
    Drawer,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Divider,
    IconButton,
    PaletteMode
} from "@mui/material";
import Tooltip from "../../Tooltip/Tooltip";
// Icons
import {LightMode, DarkMode, SettingsBrightness, Close} from "@mui/icons-material";
import {SettingsModalProps} from "./SettingsModal.props";

const SettingsModal = ({open, onClose, ...props}: SettingsModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const settingsState = useAppSelector(state => state.theme);

    const handleThemeChange = (event: React.MouseEvent<HTMLElement>, newTheme: PaletteMode | null): void => {
        if(newTheme !== null) {
            dispatch(changeTheme(newTheme));
        }
    };

    return (
        <Drawer
            open={open}
            anchor="right"
            onClose={onClose}
        >
            <Box sx={{ width: "400px"}} p={2}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant="h6"  component="h5">
                        Настроки ЛК
                    </Typography>
                    <Tooltip title="Закрыть">
                        <IconButton color="primary" onClick={onClose}>
                            <Close color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{margin: "15px 0"}} />
                <Box mb={2}>
                    <Typography variant="subtitle1"  component="p">
                        Цветовой режим
                    </Typography>
                </Box>
                <Box>
                    <ToggleButtonGroup
                        color="primary"
                        value={settingsState.theme}
                        exclusive
                        onChange={handleThemeChange}
                        sx={{display: "flex"}}
                    >
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="light">
                           <LightMode />
                            Светлый
                        </ToggleButton>
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="system">
                            <SettingsBrightness />
                            Системный
                        </ToggleButton>
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="dark">
                            <DarkMode />
                            Тёмный
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>
        </Drawer>
    )
}

export default SettingsModal;