import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/user/validate-token', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        validateToken();
    }, []);

    if (isLoading) {
        return null; // or a loading spinner component
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return children;
}

export default ProtectedRoute;