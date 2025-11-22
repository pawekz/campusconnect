import React, { useState, useEffect } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const PendingTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const theme = useTheme();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  const fetchPendingTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/API/transactions/pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
    }
  };

  return (
    <PageContainer
      title="Pending Transactions"
      breadcrumbs={[
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Pending Transactions', path: '/dashboard/transactions/pending' }
      ]}
    >
      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.productListing.product_title}</TableCell>
                  <TableCell>{transaction.user.name}</TableCell>
                  <TableCell>₱{transaction.productListing.price}</TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color="warning"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {transactions.length === 0 && (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mt: 4,
              color: theme.palette.text.secondary
            }}
          >
            No pending transactions found
          </Typography>
        )}
      </Box>
    </PageContainer>
  );
};

export default PendingTransaction;