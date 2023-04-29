import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import {BACKEND_API_URL} from "../../constants";
import {Team} from "../../models/Team";
import axios from "axios";

function MyTableCell(props : number | any) {
    const [team, setTeam] = useState<Team>();
    console.log(props.id);


    useEffect(() => {
        const url = `${BACKEND_API_URL}/teams/${props.id}`
        const axiosTeamId = async () => {
            await axios.get(url)
                .then(response => {
                    console.log(response.data);
                    const team = response.data;
                    setTeam(team);
                    console.log(team);
                }, error => {
                    console.log(error);
                });
        };
        axiosTeamId();

        //fetchTeam();
    }, [props.id]);
    function countTeamTask() {
        if (team == null)
            return 0;
        return team["teamTask"]?.length;
    }

    return (
        <TableCell align="right">{countTeamTask()}</TableCell>
    );
}

export default MyTableCell;