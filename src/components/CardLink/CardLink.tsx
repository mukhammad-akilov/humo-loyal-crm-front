import {Box, ButtonBase, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";
import {CardLinkProps} from "./CardLink.props";

const CardLink = ({title, link, disabled = false, ...restProps}: CardLinkProps): JSX.Element => {
    return (
        <Box boxShadow={3} sx={{ height: "100%" }}>
            <ButtonBase
                component={RouterLink}
                to={link}
                disabled={disabled}
                sx={{
                    padding: "15px",
                    minHeight: "140px",
                    height: "100%",
                    opacity: disabled ? 0.5 : 1,
                    backgroundColor:(theme) => theme.palette.mode === 'dark' ? theme.palette.divider : "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: "1rem",
                    "&:disabled": {
                        backgroundColor: "red", // Not working
                    },
                    "&:hover .cardIconContainer": {
                        backgroundColor: (theme) => theme.palette.secondary.main,
                        color: "#FFFFFF",
                    },
                    "& .cardIconContainer": {
                        border: (theme) => `2px solid ${theme.palette.secondary.main}`,
                        borderRadius: "50%",
                        alignSelf: "flex-end",
                        width: "42px",
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: (theme) => theme.palette.secondary.main,
                        transition: "all 0.2s linear",
                    },
                }}
            >
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Box className="cardIconContainer">
                    <ArrowForward fontSize="large" color="inherit" />
                </Box>
            </ButtonBase>
        </Box>
    );
}

export default CardLink;