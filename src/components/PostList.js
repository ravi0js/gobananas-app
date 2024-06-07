import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPosts } from "../api";
import { useTheme } from "./ThemeContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortModel, setSortModel] = useState([{ field: "title", sort: "asc" }]);
  const [pageSize, setPageSize] = useState(10);

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const filteredPosts = posts.filter((post) =>
    Object.keys(post).some((key) =>
      post[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { field: "id", headerName: "Post ID", width: 60 },
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "title", headerName: "Title", width: 350 },
    { field: "body", headerName: "Body", width: 600 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
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
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
        />
      </Box>
      <Box height={600}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50,100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sortingOrder={["asc", "desc"]}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          loading={loading}
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default PostList;
