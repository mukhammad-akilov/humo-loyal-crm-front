import React, {useState, useEffect} from "react";
// Material UI
import {Box,  Typography, TableRow, Skeleton, Alert, Paper, TableContainer, IconButton, Table, TableCell, TableHead, TableBody} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {ApiUrl, ProjectTitle} from "../../config";
import httpService, {HttpError} from "../../httpService/httpService";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
import {IApiConfig} from "../../httpService/httpService.interface";

import l_times from "lodash/times";
import useHttpService from "../../customHooks/useHttpService";
import {RolesListProps} from "./RolesList.props";
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {Edit, Delete, Person} from "@mui/icons-material"
import {RolesListResponse, Role} from "../../interfaces/role.interface";
// Modals
import RoleDeleteModal from "./modals/RoleDeleteModal";
import RoleRegisterModal from "./modals/RoleRegisterModal";


const tableColumns = ["№", "Название роли", "Действия"];

const RolesList = ({title = "Заголовок пустой", ...restProps}: RolesListProps): JSX.Element => {
    const [refetchData, setRefetchData] = useState<boolean>(true);
    // Modals
    const [selectedBonus, setSelectedBonus] = useState<Partial<Role>>({});
    const [openBonusEditModal, setOpenBonusEditModal] = useState<boolean>(false);

    // Fields by custom hook
    const apiConfig: IApiConfig = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    };
    const [loadingRoles, rolesList, error] = useHttpService<RolesListResponse[]>(apiConfig, `role`, [], refetchData);

    useEffect(() => {
        // Update title
        document.title = `${title} | ${ProjectTitle}`;
    }, []);

    useEffect(() => {
        if(!loadingRoles) {
            setRefetchData(false);
        }
    }, [loadingRoles]);

    return (
        <>
            <Box my={4} style={{textAlign: "center"}}>
                <Typography variant="h4" component="h1">
                    {title}
                </Typography>
            </Box>
            <Breadcrumbs currentLinkText={title} />
            <Box mb={3}>
                <RoleRegisterModal
                    onSuccessClose={() => setRefetchData(true)}
                />
            </Box>
            {loadingRoles ?
                <Box sx={{display: "flex", gap: "15px", flexDirection: "column"}}>
                    {l_times(12).map((item,counter) => (
                        <Skeleton variant="rectangular" animation="wave" height={35} key={counter} />
                    ))}
                </Box>
                : rolesList.length > 0 ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{backgroundColor: theme => theme.palette.secondary.main}}>
                                        <TableRow>
                                            {tableColumns.map((column, index) => (
                                                <TableCell
                                                    key={index}
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "#FFFFFF"
                                                    }}
                                                >
                                                    {column}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rolesList.map((role, index) => (
                                            <TableRow
                                                hover
                                                key={role.id}
                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {role.name}
                                                    <br/>
                                                    <Box component="span">
                                                        {role.description}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography noWrap>
                                                        <Tooltip title="Список пользователей">
                                                            <IconButton
                                                                color="secondary"
                                                                onClick={() => {setSelectedBonus(role); setOpenBonusEditModal(true)}}
                                                            >
                                                                <Person />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Редактировать">
                                                            <IconButton
                                                                color="secondary"
                                                                onClick={() => {setSelectedBonus(role); setOpenBonusEditModal(true)}}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Удалить">
                                                            <IconButton
                                                                color="secondary"
                                                                onClick={() => {setSelectedBonus(role); setOpenBonusEditModal(true)}}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>

                    )
                    :
                    <Alert severity="warning">Нет добавленных ролей</Alert>
            }
        </>
    )
}

export default RolesList;