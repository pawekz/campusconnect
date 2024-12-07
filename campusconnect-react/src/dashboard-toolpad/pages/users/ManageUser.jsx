import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import {Tooltip} from "@mui/material";
import EditProfileIcon from '../../../assets/editProfile3.json?url';
import DeleteProfileIcon from '../../../assets/deleteProfile2.json?url';
import {defineElement} from "@lordicon/element";
import lottie from "lottie-web";
import DeleteUserModal from "./DeleteUserModal.jsx";
import EditUserModal from './EditUserModal.jsx';

defineElement(lottie.animation);

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationName, setConfirmationName] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    user_type: ''
  });

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

  const handleEditPrompt = (user) => {
    setUserToEdit(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      user_type: user.user_type
    });
    setOpenEditDialog(true);
  };

  const handleConfirmEdit = () => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:8080/API/admindashboard/manageUsers/${userToEdit.id}`, editFormData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then(() => {
          setUsers(users.map(user =>
              user.id === userToEdit.id
                  ? {...user, ...editFormData}
                  : user
          ));
          setOpenEditDialog(false);
          setUserToEdit(null);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
  };

  const handleDeletePrompt = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete(user);
    setOpenDeleteDialog(true);
    setConfirmationName('');
  };

  const handleConfirmDelete = () => {
    if (userToDelete && confirmationName === userToDelete.name) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:8080/API/admindashboard/manageUsers/${userToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
          .then(() => {
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setOpenDeleteDialog(false);
            setUserToDelete(null);
            setConfirmationName('');
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'user_type', headerName: 'User Type', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
          <Box>
            <Tooltip title="Edit Account">
              <IconButton
                  aria-label="edit"
                  size="large"
                  onClick={() => handleEditPrompt(params.row)}
              >
                <lord-icon
                    trigger="hover"
                    src={EditProfileIcon}
                    style={{width: '32px', height: '32px'}}
                >
                </lord-icon>
              </IconButton>
            </Tooltip>
          <Tooltip title="Delete Account">
            <IconButton aria-label="delete" size="large">
              <lord-icon
                  trigger="hover"
                  src={DeleteProfileIcon}
                  style={{width: '32px', height: '32px'}}
                  onClick={() => handleDeletePrompt(params.row.id)}
              >
              </lord-icon>
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
      {/*inig click sa Delete Bin Icon, tawgon ang DeleteUserModal*/}
      <DeleteUserModal
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          userToDelete={userToDelete}
          confirmationName={confirmationName}
          setConfirmationName={setConfirmationName}
          onConfirmDelete={handleConfirmDelete}
      />
      {/*inig click sa Edit Icon, tawgon ang EditUserModal*/}
      <EditUserModal
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          userToEdit={userToEdit}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          onConfirmEdit={handleConfirmEdit}
      />
    </PageContainer>
  );
}