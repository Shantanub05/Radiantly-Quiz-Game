import React from "react";
import { Box, Paper, Typography, Button, Divider, Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { score, timeSpent } = location.state || { score: 0, timeSpent: 0 };
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: 'Who wrote "To Kill a Mockingbird"?',
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
      answer: "Harper Lee",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Saturn", "Neptune"],
      answer: "Jupiter",
    },
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      answer: "1945",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      answer: "Au",
    },
  ];
  const totalQuestions = questions.length;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#f0f4f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 3, sm: 4, md: 6 },
          width: "100%",
          maxWidth: 800,
          textAlign: "center",
          borderRadius: { xs: 4, sm: 10 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <EmojiEventsIcon
          sx={{ fontSize: 100, color: "#ffd700", marginBottom: 4 }}
        />
        <Typography
          variant="h3"
          component="div"
          sx={{ marginBottom: 4, color: "#1a237e" }}
        >
          Quiz Completed!
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={2}
              sx={{ padding: 3, backgroundColor: "#e8f5e9" }}
            >
              <SchoolIcon
                sx={{ fontSize: 40, color: "#4caf50", marginBottom: 2 }}
              />
              <Typography variant="h5" component="div">
                Your Score
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ color: "#4caf50" }}
              >
                {score} / {totalQuestions}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={2}
              sx={{ padding: 3, backgroundColor: "#e3f2fd" }}
            >
              <AccessTimeIcon
                sx={{ fontSize: 40, color: "#2196f3", marginBottom: 2 }}
              />
              <Typography variant="h5" component="div">
                Time Taken
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ color: "#2196f3" }}
              >
                {formatTime(timeSpent)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          size="large"
          sx={{
            fontSize: "1.2rem",
            padding: "15px 40px",
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
};

export default Result;
