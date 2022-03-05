import { Home as HomeIcon, Payment,PersonAdd } from "@mui/icons-material";

export interface INavbarLink {
    title: string,
    link: string,
    icon: JSX.Element,
    type: string
}

export interface INavbarRoute {
    title: string,
    link?: string,
    icon: JSX.Element,
    type: string,
    openValue?: boolean,
    openFunc?: (state: boolean) => void;
    links?: INavbarLink []
}

const navbarRoutes: INavbarRoute [] = [
    {
      title: "Главная",
      link: "/",
      icon: <HomeIcon color="primary" />,
      type: "link",
    },
    {
      title: "Создание платежа",
      link: "/create-payment",
      icon: <Payment color="primary" />,
      type: "link",
    },
    {
      title: "Создание клиента",
      link: "/create-customer",
      icon: <PersonAdd color="primary" />,
      type: "link",
    },
  ];

export default  navbarRoutes;