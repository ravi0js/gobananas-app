import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Skeleton } from "@mui/lab";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoading(false); // Set loading to false once data is fetched
    };
    getUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? ( // Display skeleton while loading
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user.login.uuid}>
              <ListItemText
                primary={`${user.name.first} ${user.name.last}`}
                secondary={user.email}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserList;
    