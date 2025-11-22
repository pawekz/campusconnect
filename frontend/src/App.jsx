import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard-toolpad/pages/dashboard/Dashboard-toolpad.jsx";
import Homepage from "./dashboard-toolpad/pages/homepage/Homepage.jsx";
import Register from "./components/authentication/SignUp.jsx"
import Signin from "./components/authentication/SignIn2.jsx"

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}