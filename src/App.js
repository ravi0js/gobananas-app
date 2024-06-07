import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import {ThemeProviderWrapper} from "./components/ThemeContext";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <NavBar/>
      <ThemeProviderWrapper>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
      </ThemeProviderWrapper>
      <Footer/>
    </Router>
  );
};

export default App;
