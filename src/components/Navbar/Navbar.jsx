import {useState, Fragment} from 'react';
// Redux
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../store/actions/userActions";
// Project settings
import {ProjectTitle} from "../../config";
// React router
import {Link, useHistory, useLocation} from 'react-router-dom';
// Material UI
import { Drawer, Collapse, List, Divider, AppBar, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, Typography,
    Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Badge} from '@mui/material';
// Tooltip
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {Menu as MenuIcon, AccountCircle, ExitToApp, ExpandLess, ExpandMore, Settings, Notifications} from "@mui/icons-material";
// Images
import humoLogo from '../../assets/images/humo-white-logo-no-text.svg';
import SettingsModal from "./modals/SettingsModal";
import navbarRoutes from './navbarRoutes';

const Navbar = () => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const routerHistory = useHistory();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const appBarMenuOpen = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [openSettingsModal, setOpenSettingsModal] = useState(false);


    const childIsActive = children => {
        const result = children.filter(child => location.pathname === child.link);
        return result.length > 0;
    };

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };


    const sideList = () => (
        <Box
            sx={{ width: "280px"}}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer( false)}
        >
            <List component="nav">
                {navbarRoutes.map((navbarItem, counter) => {
                    switch(navbarItem.type) {
                        case "link":
                            return (
                                <ListItem
                                    button
                                    component={Link}
                                    to={navbarItem.link}
                                    key={counter}
                                    selected={location.pathname === navbarItem.link}
                                >
                                    <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                    <ListItemText primary={navbarItem.title} />
                                </ListItem>
                            );
                            break;
                        case "dropdown":
                            return (
                                <Fragment key={counter}>
                                    <ListItem
                                        selected={childIsActive(navbarItem.links)}
                                        button
                                        onClick={e => {navbarItem.openFunc(!navbarItem.openValue); e.stopPropagation();}}
                                    >
                                        <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                        <ListItemText primary={navbarItem.title} />
                                        {navbarItem.openValue ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={navbarItem.openValue} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {navbarItem.links.map((nestedLink, counter) => (
                                                <ListItem
                                                    button
                                                    sx={{paddingLeft: (theme) => theme.spacing(4)}}
                                                    component={Link}
                                                    to={nestedLink.link}
                                                    selected={location.pathname === nestedLink.link}
                                                    key={counter}
                                                >
                                                    <ListItemIcon>{nestedLink.icon}</ListItemIcon>
                                                    <ListItemText primary={nestedLink.title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Fragment>
                            );
                            break;
                        case "divider":
                            return (
                              <Divider style={{margin: "12px 0"}} key={counter} />
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
    );

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
                                <MenuItem onClick={() =>  {setAnchorEl(null);  routerHistory.push("/profile");}}>Мой профиль</MenuItem>
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
                    {sideList()}
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
                        <Button onClick={() => setDialogOpen(false)} color="secondary" variant="contained">Нет</Button>
                        <Button onClick={() => {setDialogOpen(false); dispatch(logout())}} color="secondary" autoFocus variant="contained">Да</Button>
                    </DialogActions>
                </Dialog>
                <SettingsModal open={openSettingsModal} onClose={() => setOpenSettingsModal(false)} />
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