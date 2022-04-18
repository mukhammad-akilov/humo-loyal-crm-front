import React, {Fragment, useState} from 'react';
// Redux
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../customHooks/redux";
import {logout} from "../../store/slices/userSlice";
// TS types
import navbarRoutes, {NavbarItemType, NavbarLink, NavbarRoute} from "./navbarRoutes";
// Project settings
import {ProjectTitle} from "../../config";
// React router
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
// Material UI
import {AppBar, Box, Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from '@mui/material';
import {motion} from "framer-motion";
// Tooltip
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {AccountCircle, ExitToApp, ExpandLess, ExpandMore, Menu as MenuIcon, Settings} from "@mui/icons-material";
// Images
import humoLogo from '../../assets/images/humo-white-logo-no-text.svg';
// Modals
import SettingsModal from "./modals/SettingsModal";
import CanAccess from "../CanAccess/CanAccess";

const Navbar = () => {
    const userState = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const appBarMenuOpen = Boolean(anchorEl);
    // Modals
    const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
    const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

    const childIsActive = (children: NavbarLink[] | undefined): boolean => {
        if(children !== undefined) {
            const result = children.filter((child: NavbarLink) => location.pathname === child.link);
            return result.length > 0;
        }
        return false;
    };

    // const childIsActive = (link: string | undefined): boolean => {
    //     return (location.pathname === link && link !== undefined);
    // };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const SideList = (): JSX.Element => {
        return (
            <Box
                sx={{ width: "280px"}}
                role="presentation"
                // onClick={event => {toggleDrawer( false); alert("Click")}}
                onClick={toggleDrawer( false)}
                onKeyDown={toggleDrawer( false)}
            >
                {userState.loadingInfo ?
                    <div>
                        Loading skeleton
                    </div>
                    :
                    <List component="nav">
                        {navbarRoutes.map((navbarItem: NavbarRoute, index: number): JSX.Element | null => {
                            switch(navbarItem.type) {
                                case NavbarItemType.Link:
                                    return (
                                        <motion.div
                                            key={index}
                                            animate={{
                                                x: 0,
                                                scale: 1
                                            }}
                                            initial={{
                                                x: "-100%",
                                                scale: 0.8
                                            }}
                                        >
                                            <CanAccess
                                                accessType="page"
                                                key={index}
                                                route={navbarItem.link!}
                                                component={
                                                    <ListItemButton
                                                        component={RouterLink}
                                                        to={navbarItem.link!}
                                                        // onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
                                                        selected={location.pathname === navbarItem.link}
                                                        // sx={{pointerEvents: "auto!important"}}
                                                    >
                                                        <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                                        <ListItemText primary={navbarItem.title} />
                                                    </ListItemButton>
                                                }
                                            />
                                        </motion.div>
                                    )
                                case NavbarItemType.Dropdown:
                                    return (
                                        <Fragment key={index}>
                                            <ListItemButton
                                                selected={childIsActive(navbarItem.links)}
                                                onClick={(e: React.MouseEvent) => {navbarItem.openFunc?.(!navbarItem.openValue); e.stopPropagation();}}
                                            >
                                                <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                                <ListItemText primary={navbarItem.title} />
                                                {navbarItem.openValue ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={navbarItem.openValue} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {navbarItem.links?.map((nestedLink, counter) => (
                                                        <ListItemButton
                                                            sx={{paddingLeft: (theme: Theme) => theme.spacing(4)}}
                                                            component={RouterLink}
                                                            to={nestedLink.link}
                                                            selected={location.pathname === nestedLink.link}
                                                            key={counter}
                                                        >
                                                            <ListItemIcon>{nestedLink.icon}</ListItemIcon>
                                                            <ListItemText primary={nestedLink.title} />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </Fragment>
                                    );
                                case NavbarItemType.Divider:
                                    return (
                                        <Divider sx={{margin: "12px 0"}} key={index} />
                                    );
                                default:
                                    return null;
                            }
                        })}
                        <ListItem
                            button
                            onClick={() => setOpenLogoutDialog(true)}
                        >
                            <ListItemIcon>
                                <ExitToApp color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Выйти" />
                        </ListItem>
                    </List>
                }
            </Box>
        )
    };

    if (userState.isAuth) {
        return (
            <>
                <AppBar position="sticky">
                    <Toolbar sx={{minHeight: "70px!important"}}>
                        <IconButton
                            edge="start"
                            sx={{marginRight: (theme: Theme) => theme.spacing(2)}}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer( true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component="img"
                            src={humoLogo}
                            alt="МДО Хумо"
                            sx={{  width: "40px", marginRight: "10px"}}
                        />
                        <Typography variant="h6" sx={{flexGrow: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",}}>
                            {ProjectTitle}
                        </Typography>
                        <Box sx={{ display: "flex"}}>
                            {/* <Tooltip title="Настройки ЛК">
                                <IconButton
                                    size="large"
                                    aria-label="show new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={6} color="error">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Настройки CRM">
                                <IconButton
                                    size="large"
                                    aria-label="show new notifications"
                                    color="inherit"
                                    onClick={() => setOpenSettingsModal(true)}
                                >
                                    <Settings />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Мой профиль">
                                <IconButton
                                    aria-label="show new notifications"
                                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(event.currentTarget)}
                                    color="inherit"
                                    size="large"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={appBarMenuOpen}
                                onClose={() =>  setAnchorEl(null)}
                            >
                                <MenuItem onClick={() =>  {setAnchorEl(null);  navigate("/profile");}}>Мой профиль</MenuItem>
                                <MenuItem onClick={() =>  {setAnchorEl(null); setOpenLogoutDialog(true);}}>Выйти</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={openDrawer}
                    onClose={toggleDrawer( false)}
                    // variant="persistent"
                >
                   <SideList />
                </Drawer>
                <Dialog
                    open={openLogoutDialog}
                    onClose={()=> setOpenLogoutDialog(false)}
                >
                    <DialogTitle>{"Выход"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Вы действительно хотите выйти?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenLogoutDialog(false)}
                            color="secondary"
                            variant="contained"
                        >
                            Нет
                        </Button>
                        <Button
                            onClick={() => {setOpenLogoutDialog(false); dispatch(logout());}}
                            color="secondary"
                            autoFocus
                            variant="contained"
                        >
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
                <SettingsModal
                    open={openSettingsModal}
                    onClose={() => setOpenSettingsModal(false)}
                />
            </>
        );
    } else if (location.pathname === "/404") {
        return (
            <>
                <AppBar position="sticky">
                    <Toolbar>
                        <Box
                            component="img"
                            src={humoLogo}
                            alt="МДО Хумо"
                            sx={{  width: "40px", marginRight: "10px"}}
                        />
                        <Typography variant="h6" sx={{flexGrow: 1}}>
                            {ProjectTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
    return null;
};

export default  Navbar;