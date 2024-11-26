import React, { useState, useEffect } from 'react';
import { PageContainer } from '@toolpad/core';
import { Box, Card, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Link } from '@mui/material'
import ManageUser from '../users/ManageUser.jsx'

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
                    component={Link}
                    href="/users"  // Direct route to users management
                    sx={{
                        p: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                            cursor: 'pointer',
                            bgcolor: 'action.hover'
                        }
                    }}
                >
                    <Typography variant="h6">Users</Typography>
                    <Typography>Total Number: {stats.totalUsers}</Typography>
                </Card>

                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Transactions</Typography>
                    <Typography>Total Transactions: {stats.totalTransactions}</Typography>
                </Card>

                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Listings</Typography>
                    <Typography>Active Listings: {stats.activeListing}</Typography>
                </Card>
            </Box>

            <Card sx={{ p: 2 }}>
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
