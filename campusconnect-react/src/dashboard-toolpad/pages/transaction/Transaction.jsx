import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8080/API/transactions/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.table(response.data); // Log the response data
      if (response.data && response.data.length > 0) {
        setTransactions(response.data);
      } else {
        setTransactions([{ id: 'no-data', status: 'No data available' }]);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
      console.error('Response:', error.response);
      setLoading(false);
    });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user_id', headerName: 'User Id', width: 150 },
    { field: 'transaction_details', headerName: 'Transaction Details', width: 300 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    { field: 'product_listing_id', headerName: 'Product Listing Id', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 200 },
  ];

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
            Transactions
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <StyledDataGrid
              rows={transactions}
              columns={columns}
              pageSize={4}
              rowsPerPageOptions={[4, 8, 16]}
              disableSelectionOnClick
              loading={loading}
            />
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default Transaction;