import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';

const AnalyticsReport = ({ userId }) => {
    const [report, setReport] = useState({
        userId: '',
        itemsSold: '',
        totalEarnings: ''
    });

    const fetchReport = async (userId) => {
        try {
            console.log(`Fetching report for userId: ${userId}`);
            const response = await axios.get(`http://localhost:8080/API/analytics/generateReport/${userId}`);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            const [userIdText, itemsSoldText, totalEarningsText] = response.data.split(', ');
            const userId = userIdText.split(': ')[1];
            const itemsSold = itemsSoldText.split(': ')[1];
            const totalEarnings = totalEarningsText.split(': ')[1];

            setReport({ userId, itemsSold, totalEarnings });
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    useEffect(() => {
        fetchReport(userId); // Fetch report for the given userId
    }, [userId]);

    return (
        <Container>
            {/*<Box mt={1}>
                <Typography variant="h6">Index Report</Typography>
                <Typography variant="body1">User ID: {report.userId}</Typography>
                <Typography variant="body1">Items Sold: {report.itemsSold}</Typography>
                <Typography variant="body1">Total Earnings: {report.totalEarnings}</Typography>
            </Box>*/}
        </Container>
    );
};

export default AnalyticsReport;