import { Routes, Route, Link} from 'react-router-dom';
import AppBar from './appbar/CampusConnectAppBar.jsx';
import {Home} from "@mui/icons-material";

export default function CampusConnectRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<AppBar />} />
        </Routes>
    );
}