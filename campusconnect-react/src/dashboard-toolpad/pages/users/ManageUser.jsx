import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {Tooltip} from "@mui/material";

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

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleEdit = (user) => {
    console.log('Editing user:', user);
  };

  const handleDeleteUsers = (selectedIds) => {
    const token = localStorage.getItem('token');
    const deletePromises = selectedIds.map(id =>
      axios.delete(`http://localhost:8080/API/admindashboard/manageUsers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        setUsers(users.filter(user => !selectedIds.includes(user.id)));
      })
      .catch(error => {
        console.error('Error deleting users:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'user_type', headerName: 'User Type', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit Account">
          <IconButton aria-label="edit" size="large">
            <EditIcon fontSize="inherit" sx={{ color: 'primary.main' }} onClick={() => handleEdit(params.row)} />
          </IconButton>
          </Tooltip>
            <Tooltip title= "Delete Account">
          <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" sx={{ color: 'error.main' }} onClick={() => handleDeleteUsers([params.row.id])} />
          </IconButton>
          </Tooltip>
        </Box>
      ),
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/API/admindashboard/manageUsers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  }, []);

  return (
    <PageContainer>
      <Box sx={{ height: 400, width: '100%' }}>
        <StyledDataGrid
          rows={users}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[4, 8, 16]}
          disableSelectionOnClick
          loading={loading}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </Box>
    </PageContainer>
  );
}