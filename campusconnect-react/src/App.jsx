import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*import HelloWorld from "./HelloWorld.jsx";*/
import AppBar from "./components/dashboard/components/appbar/CampusConnectAppBar.jsx";
import CampusConnectDashboard from "./components/dashboard/CampusConnectDashboard.jsx";

function App() {
    return (
        <div className="HelloWorld">
            <CampusConnectDashboard />
        </div>
    );
}

export default App;