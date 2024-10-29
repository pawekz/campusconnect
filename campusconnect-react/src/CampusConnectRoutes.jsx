import { Routes, Route, Link} from 'react-router-dom';
import AppBar from './components/dashboard/components/appbar/CampusConnectAppBar.jsx';
import {Home} from "@mui/icons-material";
import Dashboard from "./components/dashboard/CampusConnectDashboard.jsx";

export default function CampusConnectRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    );
}