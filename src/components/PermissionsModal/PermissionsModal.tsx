import React, {useState, useEffect} from "react";
import {useAppSelector} from "../../customHooks/redux";
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField, LinearProgress} from "@mui/material";

const PermissionsModal = (): JSX.Element => {
    const userState = useAppSelector(state => state.user);

    return (
        <>
            <Dialog
                open={userState.loadingInfo}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle sx={{textAlign: "center"}}>Получение данных и прав доступов</DialogTitle>
                <DialogContent dividers={true}>
                    <LinearProgress color="secondary"/>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default PermissionsModal;