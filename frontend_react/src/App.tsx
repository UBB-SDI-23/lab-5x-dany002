import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import {AllTeams} from "./components/teams/AllTeams";

function App() {
    return (
        <React.Fragment>
            <Router>
                <AppMenu />
                <Routes>
                    <Route path="/" element={<AppHome />} />
                    <Route path="/teams" element={<AllTeams />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App
