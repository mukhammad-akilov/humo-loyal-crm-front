import React from "react";
import { Home as HomeIcon, Payment,PersonAdd, Accessibility } from "@mui/icons-material";

export interface NavbarLink {
    title: string,
    link: string,
    icon: JSX.Element,
    type: string
}

export interface NavbarRoute {
    title: string,
    link?: string,
    icon: React.ReactNode,
    type: NavbarItemType,
    openValue?: boolean,
    openFunc?: (state: boolean) => void;
    links?: NavbarLink []
}

export enum NavbarItemType {Link, Dropdown, Divider}

const navbarRoutes: NavbarRoute[] = [
    {
      title: "Главная",
      link: "/",
      icon: <HomeIcon color="primary" />,
      type: NavbarItemType.Link,
    },
    {
      title: "Создание платежа",
      link: "/create-payment",
      icon: <Payment color="primary" />,
      type: NavbarItemType.Link,
    },
    {
      title: "Создание клиента",
      link: "/create-customer",
      icon: <PersonAdd color="primary" />,
      type: NavbarItemType.Link,
    },
    {
        title: "Список бонусов",
        link: "/bonuses",
        icon: <PersonAdd color="primary" />,
        type: NavbarItemType.Link,
    },
    {
        title: "Список ролей и прав",
        link: "/roles",
        icon: <Accessibility color="primary" />,
        type: NavbarItemType.Link,
    },
  ];

export default  navbarRoutes;