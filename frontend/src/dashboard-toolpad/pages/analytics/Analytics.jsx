import React, { useState, useEffect } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

function Analytics() {
    const [listingData, setListingData] = useState({ months: [], counts: [] });
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    useEffect(() => {
        fetchListingAnalytics();
    }, []);

    const fetchListingAnalytics = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/API/analytics/listings-by-month', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setListingData({
                months: monthNames,
                counts: response.data.counts
            });
        } catch (error) {
            console.error('Error fetching listing analytics:', error);
        }
    };

    return (
        <PageContainer>
            <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                <Card sx={{ minWidth: 550 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Listings Created (Monthly)
                        </Typography>
                        <LineChart
                            xAxis={[{
                                data: monthNames,
                                scaleType: 'band'
                            }]}
                            series={[{
                                data: listingData.counts,
                                label: 'Number of Listings'
                            }]}
                            width={500}
                            height={300}
                        />
                    </CardContent>
                </Card>
                {/* Add two more cards here for other analytics */}
            </Box>
        </PageContainer>
    );
}

export default Analytics;
