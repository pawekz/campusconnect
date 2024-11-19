import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signin from "./components/authentication/Signin.jsx";
import Register from "./components/authentication/Register.jsx";
import {Route, Routes} from "react-router-dom";
import DashboardToolpad from "./dashboard-toolpad/pages/dashboard/Dashboard-toolpad.jsx";
import Homepage from "./dashboard-toolpad/pages/homepage/Homepage.jsx";


export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard-toolpad/*"
                    element={
                        <ProtectedRoute>
                            <DashboardToolpad />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}