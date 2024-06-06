    import React from "react";
    import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
    import { Link } from "react-router-dom";

    const NavBar = () => {
    return (
        <AppBar position="static">
        <Container>
            <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                GoBananas App
            </Typography>
            <Button color="inherit" component={Link} to="/">
                Posts
            </Button>
            <Button color="inherit" component={Link} to="/users">
                Users
            </Button>
            </Toolbar>
        </Container>
        </AppBar>
    );
    };

    export default NavBar;
