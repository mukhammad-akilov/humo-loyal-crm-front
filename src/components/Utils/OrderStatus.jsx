import {Chip} from "@mui/material";
import React from "react";

const OrderStatus = ({status, ...props}) => {
    let statusColor;

    switch (status.toLowerCase()) {
        case "успешно выдан":
            statusColor = "success";
            break;
        case "отменен":
            statusColor = "error";
            break;
        case "ожидает оплаты":
            statusColor = "warning";
            break;
        default:
            statusColor = "primary";
    }

    return (
        <Chip
            label={status.toUpperCase()}
            color={statusColor}
        />
    );
}

export default OrderStatus;