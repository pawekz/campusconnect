import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import {PageContainer} from "@toolpad/core/PageContainer";

const Transaction = () => {
    return (
        <PageContainer>
        <Container maxWidth="lg">
            <Box sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 4,
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    Transaction
                </Typography>
            </Box>
        </Container>
        </PageContainer>
    );
};

export default Transaction;
