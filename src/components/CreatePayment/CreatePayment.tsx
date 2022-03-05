import {CreatePaymentProps} from "./CreatePayment.props";
import {Box, Typography} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {useEffect} from "react";
import {ProjectTitle} from "../../config";

const CreatePayment = ({title = "Заголовок пустой", ...restProps}: CreatePaymentProps): JSX.Element => {

    useEffect(() => {
        document.title = `${title} | ${ProjectTitle}`;
    }, []);

    return (
       <>
           <Box my={4} style={{textAlign: "center"}}>
               <Typography variant="h4" component="h1" gutterBottom>
                   {title}
               </Typography>
           </Box>
           <Breadcrumbs currentLinkText={title} />
       </>
    )
}

export default CreatePayment;