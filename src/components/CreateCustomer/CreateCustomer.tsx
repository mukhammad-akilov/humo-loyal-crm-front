import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {CreateCustomerProps} from "./CreateCustomer.props";

const CreateCustomer = ({title = "Заголовок пустой"}: CreateCustomerProps): JSX.Element => {
  return (
    <>
        <Box my={4} sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Breadcrumbs currentLinkText={title} />
    </>
  );
};

export default CreateCustomer;
