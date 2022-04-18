import React, {useState, useEffect} from "react";
// Material UI
import {Box,  Typography, TableRow, Skeleton, Alert, Paper, TableContainer, IconButton, Table, TableCell, TableHead, TableBody} from "@mui/material";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {ApiUrl, ProjectTitle} from "../../config";
import httpService, {HttpError} from "../../httpService/httpService";
import {handleSnackbar} from "../../store/slices/snackbarSlice";
import {IApiConfig} from "../../httpService/httpService.interface";
import {BonusesListResponse, Bonus} from "../../interfaces/bonus.interface";
import l_times from "lodash/times";
import useHttpService from "../../customHooks/useHttpService";
import {BonusesListProps} from "./BonusesList.props";
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {Edit} from "@mui/icons-material"
// Modals
import BonusRegisterModal from "./modals/BonusRegisterModal";
import BonusEditModal from "./modals/BonusEditModal";

const tableColumns = ["Заголовок", "Дневной лимит", "Месячный лимит", "Процент", "Действия"];

const BonusesList = ({title = "Заголовок пустой", ...restProps}: BonusesListProps): JSX.Element => {
    const [refetchData, setRefetchData] = useState<boolean>(true);
    // Modals
    const [selectedBonus, setSelectedBonus] = useState<Partial<Bonus>>({});
    const [openBonusEditModal, setOpenBonusEditModal] = useState<boolean>(false);

    // Fields by custom hook
    const apiConfig: IApiConfig = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    };
    const [loadingBonuses, bonusesList, error] = useHttpService<BonusesListResponse[]>(apiConfig, `partner/bonus_list`, [], refetchData);

    useEffect(() => {
        // Update title
        document.title = `${title} | ${ProjectTitle}`;
    }, []);

    useEffect(() => {
       if(!loadingBonuses) {
           setRefetchData(false);
       }
    }, [loadingBonuses]);

    return (
        <>
            <Box my={4} style={{textAlign: "center"}}>
                <Typography variant="h4" component="h1">
                    {title}
                </Typography>
            </Box>
            <Breadcrumbs currentLinkText={title} />
            <Box mb={3}>
                <BonusRegisterModal
                    onSuccessClose={() => setRefetchData(true)}
                />
            </Box>
            {loadingBonuses ?
                <Box sx={{display: "flex", gap: "15px", flexDirection: "column"}}>
                    {l_times(12).map((item,counter) => (
                        <Skeleton variant="rectangular" animation="wave" height={35} key={counter} />
                    ))}
                </Box>
                : bonusesList.length > 0 ? (
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
                                        {bonusesList.map(bonus => (
                                            <TableRow
                                                hover
                                                key={bonus.id}
                                            >
                                                <TableCell>
                                                    {bonus.name}
                                                </TableCell>
                                                <TableCell>
                                                    {bonus.daily_limit}
                                                </TableCell>
                                                <TableCell>
                                                    {bonus.month_limit}
                                                </TableCell>
                                                <TableCell>
                                                    {bonus.percentage}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography noWrap>
                                                        <Tooltip title="Редактировать">
                                                            <IconButton
                                                                color="secondary"
                                                                onClick={() => {setSelectedBonus(bonus); setOpenBonusEditModal(true)}}
                                                            >
                                                                <Edit />
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
                    <Alert severity="warning">Нет добавленных шаблонов</Alert>
            }
            <BonusEditModal
                open={openBonusEditModal}
                bonus={selectedBonus as Bonus}
                onClose={() => setOpenBonusEditModal(false)}
                onSuccessClose={() => {setOpenBonusEditModal(false); setRefetchData(true)}}
            />
        </>
    )
}

export default BonusesList;