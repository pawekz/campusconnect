import React, { useState, useEffect } from 'react';
import { PageContainer } from '@toolpad/core';
import { Box, Card, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTransactions: 0,
        activeListing: 0,
        popularCategoriesWithCount: []
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/admindashboard/viewPlatformStats')
            .then(response => {
                setStats(response.data);
            });
    }, []);

    const pieChartData = stats.popularCategoriesWithCount.map(item => ({
        id: item.category,
        value: item.count,
        label: item.category
    }));

    return (
        <PageContainer
            title="Dashboard"
            breadcrumbs={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Dashboard' }
            ]}
        >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
                <Card sx={{ p: 2 }}>
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