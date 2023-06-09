import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip, Button, Pagination
} from "@mui/material";

import {Link, useNavigate, useParams} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";


import React, {useEffect, useState} from "react";
import {Team} from "../../models/Team";
import {BACKEND_API_URL} from "../../constants";
import TableCellForCountingProjectsForATeam from "../Utils/TableCellForCountingProjectsForATeam";


export const AllTeams = () => {
    const [loading, setLoading] = useState(false);
    const [teams, setTeams] = useState<Team[]>([])
    const { page } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/teams/page/${currentPage}`)
                .then((response) => response.json())
                .then((data) => {
                    setTeams(data["team_members"]);
                    setTotalPages(data["total_pages"]);
                    setPageSize(data["items_per_page"]);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [currentPage]);


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedTeams = [...teams].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.admin.localeCompare(b.admin);
            } else {
                return b.admin.localeCompare(a.admin);
            }
        });
        setTeams(sortedTeams);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    const getPaginationCounts = (currentPage: number) => {
        let boundaryCount = 5;
        let siblingCount;

        switch (currentPage) {
            case 1:
                siblingCount = 0;
                break;
            case 2:
                siblingCount = 0;
                break;
            case 3:
                siblingCount = 1;
                break;
            case 4:
                siblingCount = 1;
                break;
            case 5:
                siblingCount = 2;
                break;
            case 6:
                siblingCount = 2;
                break;
            case 7:
                siblingCount = 3;
                break;
            case 8:
                siblingCount = 3;
                break;
            case 9:
                siblingCount = 4;
                break;
            case 10:
                siblingCount = 4;
                break;
            default:
                siblingCount = 5
                break;
        }

        return { boundaryCount, siblingCount };
    };

    const { boundaryCount, siblingCount } = getPaginationCounts(currentPage);


    return (
        <Container sx={{maxWidth:"xl", padding: '4em'}}>

            <h1>All teams</h1>

            {loading && <CircularProgress />}
            {!loading && teams.length === 0 && <p>No teams found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/teams/add`}>
                    <Tooltip title={"Add a new team"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && (
                <Button type={"submit"} component={Link} sx={{mr : 3}} to={'by-avg-wage/'}>Check this statistical report by avg-wage</Button>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Admin</Button>
            {!loading && teams.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Created</TableCell>
                                <TableCell align="right">Free places</TableCell>
                                <TableCell align="right">Purpose</TableCell>
                                <TableCell align="right">Admin</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="right">Number of tasks</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teams.map((team, index) => (
                                <TableRow key={team.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1 + ((currentPage-1) * pageSize)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/teams/${team.id}/details`} title={"View team details"}>
                                            {team.nameOfTeam}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{team.created?.toString()}</TableCell>
                                    <TableCell align="right">{team.freePlaces}</TableCell>
                                    <TableCell align="right">{team.purpose}</TableCell>
                                    <TableCell align="right">{team.admin}</TableCell>
                                    <TableCell align="right">{team.rating}</TableCell>
                                    <TableCellForCountingProjectsForATeam id={team.id}/>
                                    {/*<TableCell>WOW</TableCell>*/}

                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr : 3}}
                                            to={`/teams/${team.id}/details`}>
                                            <Tooltip title="View team details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/teams/${team.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/teams/${team.id}/delete`}>
                                            <DeleteForeverIcon sx={{color : "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => {
                    setCurrentPage(value);
                    navigate(`/teams/page/${value}`);
                    }
                }
                boundaryCount={boundaryCount}
                siblingCount={siblingCount}
                showFirstButton
                showLastButton

            />
        </Container>
    );
};