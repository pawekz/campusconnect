import React, { useState, useEffect } from 'react';
import { useDemoRouter } from '@toolpad/core/internal';
import { PageContainer } from '@toolpad/core';
import { Box, Card, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Link } from '@mui/material'
import ManageUser from '../users/ManageUser.jsx'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTransactions: 0,
        activeListing: 0,
        popularCategoriesWithCount: []
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/API/admindashboard/viewPlatformStats', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setStats(response.data);
        })
        .catch(error => console.error('Error fetching stats:', error));
    }, []);



    const pieChartData = stats.popularCategoriesWithCount?.map(item => ({
        id: item.category,
        value: item.count,
        label: item.category
    })) || [];

    return (
        <PageContainer
            title="Dashboard"
            breadcrumbs={[
                { title: 'Home', label: 'Home', path: '/dashboard' },
                { title: 'Dashboard', label: 'Dashboard', path: '/dashboard' }
            ]}
        >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
                <Card
                    sx={(theme) => ({
                        p: 2,
                        cursor: 'pointer',
                        borderRadius: '8px',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
                            : 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                        '&:hover': {
                            cursor: 'pointer',
                            transform: 'translateY(-2px)',
                            transition: 'transform 0.2s ease-in-out',
                            boxShadow: theme.shadows[4]
                        }
                    })}
                >
                    <Typography variant="h6">Users</Typography>
                    <Typography>Total Number: {stats.totalUsers}</Typography>
                </Card>


                <Card
                    sx={(theme) => ({
                        p: 2,
                        borderRadius: '8px',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)'
                            : 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)'
                    })}
                >
                    <Typography variant="h6">Transactions</Typography>
                    <Typography>Total Transactions: {stats.totalTransactions}</Typography>
                </Card>

                <Card
                    sx={(theme) => ({
                        p: 2,
                        borderRadius: '8px',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)'
                            : 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
                    })}
                >
                    <Typography variant="h6">Listings</Typography>
                    <Typography>Active Listings: {stats.activeListing}</Typography>
                </Card>
            </Box>

            <Card sx={{ p: 2, borderRadius: '8px',}}>
                <Typography variant="h6" sx={{ mb: 2 }}>Popular Categories</Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                    <PieChart
                        series={[
                            {
                                data: pieChartData,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30 },
                            },
                        ]}
                        height={400}
                    />
                </Box>
            </Card>
        </PageContainer>
    );
}


export default Dashboard;
