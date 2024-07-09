import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  LinearProgress,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TimerIcon from "@mui/icons-material/Timer";
import { useNavigate } from "react-router-dom";

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

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(""));
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (event) => {
    const newOption = event.target.value;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = newOption;
    setAnswers(newAnswers);

    const newScore = newAnswers.reduce((score, answer, index) => {
      return answer === questions[index].answer ? score + 1 : score;
    }, 0);
    setScore(newScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    navigate("/result", { state: { score, timeSpent: 300 - timeRemaining } });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h6" component="div">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Chip
            icon={<TimerIcon />}
            label={formatTime(timeRemaining)}
            color="primary"
            variant="outlined"
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={((currentQuestionIndex + 1) / questions.length) * 100}
          sx={{ marginBottom: 4, height: 10, borderRadius: 5 }}
        />
        <Typography
          variant="h4"
          component="div"
          sx={{ marginBottom: 6, color: "#1a237e" }}
        >
          {questions[currentQuestionIndex].question}
        </Typography>
        <Divider sx={{ marginBottom: 4 }} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <RadioGroup
            name="quiz"
            value={answers[currentQuestionIndex]}
            onChange={handleOptionChange}
            sx={{ marginBottom: 6, width: "100%" }}
          >
            {questions[currentQuestionIndex].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                sx={{
                  marginBottom: 2,
                  borderRadius: 5,
                  backgroundColor:
                    answers[currentQuestionIndex] === option
                      ? "#bbdefb"
                      : "#e3f2fd",
                  padding: 2,
                  width: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#90caf9",
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={currentQuestionIndex === 0}
            onClick={handlePreviousQuestion}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFinishQuiz}
              sx={{
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Quiz;
