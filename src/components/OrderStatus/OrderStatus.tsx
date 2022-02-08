import {Chip} from "@mui/material";
import {OrderStatusProps} from "./OrderStatus.props";

const OrderStatus = ({status, ...props}: OrderStatusProps) => {
    let statusColor: any;

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