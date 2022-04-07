import  {useEffect} from "react";
// Project settings
import {ProjectTitle} from "../../config";
// Navbar interface
import navbarRoutes, {NavbarItemType, NavbarRoute} from "../Navbar/navbarRoutes";
// Material UI
import {Box, Grid,Typography} from "@mui/material";
import CanAccess from "../CanAccess/CanAccess";
import CardLink from "../CardLink/CardLink";

const Home = () => {

  useEffect(() => {
    document.title = `Главная | ${ProjectTitle}`;
  }, []);

  return (
    <>
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
          {navbarRoutes.map((item: NavbarRoute, index: number) => {
            if (item.title === "Главная" || item.type !== NavbarItemType.Link) return null;
            return (
                <Grid
                    item xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                >
                    <CanAccess
                        accessType="page"
                        route={item.link!}
                        component={
                            <CardLink
                                title={item.title}
                                link={item.link!}
                            />
                        }
                    />
                </Grid>
            )
          })}
        </Grid>
    </>
  );
};

export default Home;
