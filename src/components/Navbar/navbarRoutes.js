import { Home as HomeIcon, Payment,PersonAdd } from "@mui/icons-material";

const navbarRoutes = [
    {
      title: "Главная",
      link: "/",
      icon: <HomeIcon color="primary" />,
      type: "link",
    },
    {
      title: "Создать платеж",
      link: "/create-payment",
      icon: <Payment color="primary" />,
      type: "link",
    },
    {
      title: "Создать клиента",
      link: "/create-customer",
      icon: <PersonAdd color="primary" />,
      type: "link",
    },
  ];

export default  navbarRoutes;