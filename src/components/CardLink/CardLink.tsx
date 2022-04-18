import {Box, ButtonBase, Theme, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";
import {CardLinkProps} from "./CardLink.props";
import {motion} from "framer-motion";

const CardLink = ({title, link, disabled = false, ...restProps}: CardLinkProps): JSX.Element => {
    return (
        <motion.div
            animate={{
                y: 0,
                opacity: 1,
                scale: 1,
            }}

            initial={{
                opacity: 0.3,
                y: -15,
                scale: 0.8,
            }}
        >
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
                        backgroundColor:(theme: Theme) => theme.palette.mode === 'dark' ? theme.palette.divider : "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "1rem",
                        "&:disabled": {
                            backgroundColor: "red", // Not working
                        },
                        "&:hover .cardIconContainer": {
                            backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                            color: "#FFFFFF",
                        },
                        "& .cardIconContainer": {
                            border: (theme: Theme) => `2px solid ${theme.palette.secondary.main}`,
                            borderRadius: "50%",
                            alignSelf: "flex-end",
                            width: "42px",
                            height: "42px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: (theme: Theme) => theme.palette.secondary.main,
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
        </motion.div>

    );
}

export default CardLink;