import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
  Container,
  Typography,
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
  Box,
  Switch,
  FormControlLabel,
  Alert,
  Divider,
  Button,
  Pagination,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import { fetchPosts } from "../api";
import { useTheme } from "./ThemeContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleSortChange = (event) => {
    const [key, order] = event.target.value.split("-");
    setSortKey(key);
    setSortOrder(order);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const sortedPosts = posts
    .filter((post) =>
      Object.keys(post).some((key) =>
        post[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aVal =
        typeof a[sortKey] === "string" ? a[sortKey].toLowerCase() : a[sortKey];
      const bVal =
        typeof b[sortKey] === "string" ? b[sortKey].toLowerCase() : b[sortKey];

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const postsPerPage = 10;
  const paginatedPosts = sortedPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label="Dark Mode"
          />
        </Box>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <FormLabel component="legend">Sort By</FormLabel>
          <Select value={`${sortKey}-${sortOrder}`} onChange={handleSortChange}>
            {["id", "userId", "title", "body"].map((key) => (
              <MenuItem key={`${key}-asc`} value={`${key}-asc`}>
                {`${
                  key.charAt(0).toUpperCase() + key.slice(1)
                } in Ascending Order`}
              </MenuItem>
            ))}
            {["id", "userId", "title", "body"].map((key) => (
              <MenuItem key={`${key}-desc`} value={`${key}-desc`}>
                {`${
                  key.charAt(0).toUpperCase() + key.slice(1)
                } in Descending Order`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : sortedPosts.length === 0 ? (
          <Alert severity="warning">No records found!</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Divider textAlign="center">Post Details</Divider>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Post ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.userId}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(sortedPosts.length / postsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
        <Box position="fixed" right={15} bottom={55}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowCircleUpIcon />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PostList;
