import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Typography,
  Box,
  Avatar,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Button,
  Pagination,
  Switch,
  FormControlLabel,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import { fetchUsers } from "../api";
import { useTheme } from "./ThemeContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleSortChange = (event) => {
    const [key, order] = event.target.value.split("-");
    setSortKey(key);
    setSortOrder(order);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    ["name", "email", "dob"].some((key) =>
      user[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase();
    const bVal = b[sortKey]?.toString().toLowerCase();
    if (sortOrder === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined">
          <FormLabel>Sort By</FormLabel>
          <Select value={`${sortKey}-${sortOrder}`} onChange={handleSortChange}>
            <MenuItem value="name-asc">Name (Asc)</MenuItem>
            <MenuItem value="name-desc">Name (Desc)</MenuItem>
            <MenuItem value="dob-asc">DOB (Asc)</MenuItem>
            <MenuItem value="dob-desc">DOB (Desc)</MenuItem>
            <MenuItem value="email-asc">Email (Asc)</MenuItem>
            <MenuItem value="email-desc">Email (Desc)</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
        />
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.login.uuid}>
                  <TableCell>
                    <Avatar src={user.picture.large} alt={user.name.first} />
                  </TableCell>
                  <TableCell>{`${user.name.title} ${user.name.first} ${user.name.last}`}</TableCell>
                  <TableCell>{`${new Date(
                    user.dob.date
                  ).toLocaleDateString()} (${user.dob.age} years)`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(user)}
                    >
                      Show Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Pagination
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
        <FormControl variant="outlined">
          <FormLabel>Rows per page</FormLabel>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Modal
        open={!!selectedUser}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={!!selectedUser}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedUser && (
              <>
                <Typography>
                  <Avatar src={selectedUser.picture.large}  />
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}
                </Typography>

                <Typography variant="body1">
                  <strong>Email:</strong> {selectedUser.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {selectedUser.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Cell:</strong> {selectedUser.cell}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {selectedUser.gender}
                </Typography>
                <Typography variant="body1">
                  <strong>DOB:</strong>{" "}
                  {`${new Date(selectedUser.dob.date).toLocaleDateString()} (${
                    selectedUser.dob.age
                  } years)`}
                </Typography>
                <Typography variant="body1">
                  <strong>Nationality:</strong> {selectedUser.nat}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong>{" "}
                  {`${selectedUser.location.street.number} ${selectedUser.location.street.name}, ${selectedUser.location.city}, ${selectedUser.location.state}, ${selectedUser.location.country} - ${selectedUser.location.postcode}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Registered:</strong>{" "}
                  {`${new Date(
                    selectedUser.registered.date
                  ).toLocaleDateString()} (${
                    selectedUser.registered.age
                  } years)`}
                </Typography>
                <Typography variant="body1">
                  <strong>ID:</strong>{" "}
                  {`${selectedUser.id.name}: ${selectedUser.id.value}`}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                  sx={{ mt: 2 }}
                >
                  Close
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default UserList;
