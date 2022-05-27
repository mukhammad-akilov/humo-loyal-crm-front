import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
// Icons
import { Add} from "@mui/icons-material";
import {IApiConfig} from "../../../httpService/httpService.interface";
import httpService, {HttpError} from "../../../httpService/httpService";
import {ApiUrl} from "../../../config";
import {RoleDeleteModalProps} from "./RoleDeleteModal.props";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";

interface validateFields {
    title: boolean;
    dailyLimit: boolean;
    monthlyLimit: boolean;
    percentage: boolean;
    payWithBonusSkip: boolean;
}

const RoleDeleteModal = ({onSuccessClose, role, onClose, open,  ...restProps}: RoleDeleteModalProps): JSX.Element => {
   return (
       <>
        <Dialog open={open}>

        </Dialog>
       </>
   )
}

export default RoleDeleteModal;