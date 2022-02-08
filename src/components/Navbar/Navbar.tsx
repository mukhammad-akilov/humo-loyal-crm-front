import React, {useState, Fragment} from 'react';
// Redux
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/redux";
import {logout} from "../../store-deprecated/actions/userActions";
// TS types
import {INavbarRoute, INavbarLink} from "./navbarRoutes";
// Project settings
import {ProjectTitle} from "../../config";
// React router
import {Link as RouterLink, useNavigate , useLocation} from 'react-router-dom';
// Material UI
import { Drawer, Collapse, List, Divider, AppBar, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Typography,
    Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box} from '@mui/material';
// Tooltip
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {Menu as MenuIcon, AccountCircle, ExitToApp, ExpandLess, ExpandMore, Settings, Notifications} from "@mui/icons-material";
// Images
import humoLogo from '../../assets/images/humo-white-logo-no-text.svg';
import SettingsModal from "./modals/SettingsModal";
import navbarRoutes from './navbarRoutes';

const Navbar = () => {
    const userState = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const appBarMenuOpen = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

    const childIsActive = (children: INavbarLink[] | undefined): boolean => {
        if(children !== undefined) {
            const result = children.filter((child: INavbarLink) => location.pathname === child.link);
            return result.length > 0;
        } else {
            return false;
        }
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
                onClick={toggleDrawer( false)}
                onKeyDown={toggleDrawer( false)}
            >
                <List component="nav">
                    {navbarRoutes.map((navbarItem: INavbarRoute, index: number): JSX.Element | null => {
                        switch(navbarItem.type) {
                            case "link":
                                return (
                                    <ListItemButton
                                        component={RouterLink}
                                        to={navbarItem.link!}
                                        key={index}
                                        selected={location.pathname === navbarItem.link}
                                    >
                                        <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                        <ListItemText primary={navbarItem.title} />
                                    </ListItemButton>
                                );
                                break;
                            case "dropdown":
                                return (
                                    <Fragment key={index}>
                                        <ListItemButton
                                            selected={childIsActive(navbarItem.links)}
                                            onClick={e => {navbarItem.openFunc?.(!navbarItem.openValue); e.stopPropagation();}}
                                        >
                                            <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                            <ListItemText primary={navbarItem.title} />
                                            {navbarItem.openValue ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={navbarItem.openValue} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {navbarItem.links?.map((nestedLink, counter) => (
                                                    <ListItemButton
                                                        sx={{paddingLeft: (theme) => theme.spacing(4)}}
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
                                break;
                            case "divider":
                                return (
                                    <Divider sx={{margin: "12px 0"}} key={index} />
                                );
                                break;
                            default:
                                return null;
                        }
                    })}
                    <ListItem button onClick={() => setDialogOpen(true)}>
                        <ListItemIcon><ExitToApp color="primary" /></ListItemIcon>
                        <ListItemText primary="Выйти" />
                    </ListItem>
                </List>
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
                            sx={{marginRight: (theme) => theme.spacing(2)}}
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
                            <Tooltip title="Настройки ЛК">
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
                                    onClick={event => setAnchorEl(event.currentTarget)}
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
                                <MenuItem onClick={() =>  {setAnchorEl(null); setDialogOpen(true);}}>Выйти</MenuItem>
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
                    open={dialogOpen}
                    onClose={()=> setDialogOpen(false)}
                >
                    <DialogTitle>{"Выход"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Вы действительно хотите выйти?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}
                                color="secondary"
                                variant="contained"
                        >
                            Нет
                        </Button>
                        <Button
                            onClick={() => {setDialogOpen(false); dispatch(logout())}}
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