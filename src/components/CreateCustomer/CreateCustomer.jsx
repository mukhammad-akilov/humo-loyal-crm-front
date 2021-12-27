import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Breadcrumbs from "../Utils/Breadcrumbs";

const CreateCutomer = ({title = "Заголовок пустой"}) => {
  return (
    <>
      <Container maxWidth={false}>
        <Box my={4} sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Breadcrumbs currentLinkText={title} />
      </Container>
    </>
  );
};

export default CreateCutomer;
