import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  createUsers,
  deleteUsers,
  editUser,
  getUsers,
} from "../action/userAction";
import { useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = (user) => {
    setIsEditing(!!user);
    setSelectedUser(user);
    setUserData(
      user
        ? { name: user.username, email: user.email, id: user?._id }
        : { name: "", email: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setUserData({ name: "", email: "" });
  };

  const handleCreateOrEdit = async () => {
    if (isEditing) {
      console.log("Editing user:", selectedUser.id, userData);
      const data = await editUser(userData);
      console.log(data);

      if (data) {
        setUsers((prevUsers) => {
          return prevUsers.map((user) =>
            user._id === data.user._id ? data.user : user
          );
        });
      }
    } else {
      console.log("Creating new user:", userData);
      const res = await createUsers(userData);
      console.log(res);
      setUsers((prev) => [...prev, res.user]);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);
    const data = await deleteUsers(id);
    console.log(data);
    if (data) {
      setUsers((prev) => {
        return prev.filter((res) => data.user._id !== res._id);
      });
    }
  };

  useEffect(() => {
    const fetchAllUser = async () => {
      setLoading(true);
      const users = await getUsers();
      console.log(users);
      setUsers(users);
      setLoading(false);
    };
    if (user && user.isAdmin) fetchAllUser();
  }, [user]);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <IconButton onClick={() => handleOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!user || !user?.isAdmin) {
    navigate("/", replace);
    return <>Not Access</>;
  }

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpen(null)}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>
      <Box
        height="55vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          loading={loading}
          columns={columns}
          checkboxSelection={false}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={24}
          sx={{ width: 400, margin: "auto", mt: 5 }}
        >
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit User" : "Create User"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          {!isEditing && (
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrEdit}
            >
              {isEditing ? "Save Changes" : "Create"}
            </Button>
            <Button onClick={handleClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminPage;
