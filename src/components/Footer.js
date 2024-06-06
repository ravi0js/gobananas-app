import React from "react";
import { Box, Typography, Icon, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Grow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {Divider} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      py={3}
      mt={4}
      textAlign="center"
    >
      <Typography variant="body1" color="primary">
        © 2024 GoBananasApp
        <Divider/>  
         Ravi Kumar |
        <Grow in timeout={1000}>
          <Link
            component={RouterLink}
            to="tel:+918873194455"
            underline="none"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <Icon component={PhoneIcon} sx={{ verticalAlign: "bottom" }} />
            8873194455
          </Link>
        </Grow>|
        <Grow in timeout={1000}>
          <Link
            component={RouterLink}
            to="mailto:ravi194455@gmail.com"
            underline="none"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <Icon component={EmailIcon} sx={{ verticalAlign: "bottom" }} />
            ravi194455@gmail.com
          </Link>
        </Grow>
      </Typography>
    </Box>
  );
};

export default Footer;
