import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AnalyticsHistoryChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [userId, setUserId] = useState('');
    const [inputUserId, setInputUserId] = useState('');

    const fetchData = (userId) => {
        console.log(`Fetching data for userId: ${userId}`);
        axios.get(`http://localhost:8080/API/analytics/history/${userId}`)
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                const data = Array.isArray(response.data) ? response.data : [];
                console.log('Fetched data:', data);

                const labels = data.map(entry => new Date(entry.timestamp).toLocaleDateString());
                const totalEarnings = data.map(entry => entry.totalEarnings);

                const newChartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Earnings',
                            data: totalEarnings,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        }
                    ]
                };

                setChartData(newChartData);
                console.log('Chart data:', newChartData);
            })
            .catch(error => {
                console.error('Error fetching analytics history:', error);
            });
    };

    const handleFetchData = () => {
        setUserId(inputUserId);
        fetchData(inputUserId);
    };

    return (
        <Container>
            <Box mt={5}>
                <TextField
                    label="User ID"
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleFetchData}>
                    Fetch Data
                </Button>
                {chartData.labels.length > 0 && (
                    <Box sx={{ width: '100%', height: '300px' }}>
                        <Bar data={chartData} />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AnalyticsHistoryChart;