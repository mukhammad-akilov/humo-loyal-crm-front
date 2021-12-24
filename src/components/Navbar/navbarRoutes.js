import { Home as HomeIcon, Payment } from "@mui/icons-material";

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
  ];

export default  navbarRoutes;