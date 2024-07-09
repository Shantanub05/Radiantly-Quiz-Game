import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ height: 80, justifyContent: "center" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <QuizIcon sx={{ marginRight: 2, fontSize: 40 }} />
          <Typography variant="h4" component="div">
            Quiz Game
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
