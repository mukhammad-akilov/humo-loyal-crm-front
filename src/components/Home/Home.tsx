import React, {useEffect } from "react";
// React Router
import { Link } from "react-router-dom";
// Project settings
import {ProjectTitle} from "../../config";
// Material UI
import {
  Box,
  Container,
  Grid,
  ButtonBase,
  Typography,
} from "@mui/material";
// Icons
import {ArrowForward} from "@mui/icons-material";
import navbarRoutes from "../Navbar/navbarRoutes";
import { useAppSelector } from "../hooks/redux";

interface CardLinkProps {
    title: string,
    link: string
}

const CardLink = ({ title, link, ...props }: CardLinkProps): JSX.Element => {
  return (
    <Box boxShadow={3} style={{ height: "100%" }}>
      <ButtonBase
          component={Link}
          to={link}
          sx={{
            padding: "15px",
            minHeight: "140px",
            height: "100%",
            backgroundColor:(theme
            ) => theme.palette.mode === 'dark' ? theme.palette.divider : "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:hover .cardIconContainer": {
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: "white",
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
        <Typography gutterBottom variant="h6" component="h2" sx={{ width: "100%", marginBottom: "1rem"}}>
          {title}
        </Typography>
        <Box className="cardIconContainer">
          <ArrowForward fontSize="large" color="inherit" />
        </Box>
      </ButtonBase>
    </Box>
  );
};


const Home = () => {
  const userState = useAppSelector(state => state.user);

  useEffect(() => {
    document.title = `Главная | ${ProjectTitle}`;
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Главная
          </Typography>
        </Box>
        <Box mt={4} mb={2}>
          <Typography variant="h5" component="h2" color="primary">
            Основное
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {navbarRoutes.map((item, idx) => {
            if (item.title === "Главная" || item.type === "divider") {
                return null
            }
            return (<Grid  key={idx} item xs={12} sm={6} md={4} lg={3}>
              <CardLink title={item.title} link={item.link} />
            </Grid>)
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
