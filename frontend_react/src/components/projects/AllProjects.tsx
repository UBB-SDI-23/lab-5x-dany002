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
import {Project} from "../../models/Project";
import {BACKEND_API_URL} from "../../constants";


export const AllProjects = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>([])
    const etc = `${BACKEND_API_URL}/projects/`;
    const navigate = useNavigate();
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);



    console.log(etc);
    useEffect(() => {
        setLoading(true);
        try{
            fetch(`${BACKEND_API_URL}/projects/`)
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    setLoading(false);
                })
        }
        catch (error){
            console.log(error);
        }
    }, [])


    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSortByAdmin = () => {
        const sortedProject = [...projects].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nameOfProject.localeCompare(b.nameOfProject);
            } else {
                return b.nameOfProject.localeCompare(a.nameOfProject);
            }
        });
        setProjects(sortedProject);
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

            <h1>All Projects</h1>

            {loading && <CircularProgress />}
            {!loading && projects.length === 0 && <p>No projects found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/projects/add`}>
                    <Tooltip title={"Add a new project"} arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            <Button onClick={handleSortByAdmin}>Sort by Admin</Button>
            {!loading && projects.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Created</TableCell>
                                <TableCell align="right">Client name</TableCell>
                                <TableCell align="right">Budget</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project, index) => (
                                <TableRow key={project.id}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/projects/${project.id}/details`} title={"View project details"}>
                                            {project.nameOfProject}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{project.created?.toString()}</TableCell>
                                    <TableCell align="right">{project.clientName}</TableCell>
                                    <TableCell align="right">{project.budget}</TableCell>
                                    <TableCell align="right">{project.description}</TableCell>
                                    <TableCell align="right">{project.status}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr : 3}}
                                            to={`/projects/${project.id}/details`}>
                                            <Tooltip title="View project details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/projects/${project.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr : 3}} to={`/projects/${project.id}/delete`}>
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