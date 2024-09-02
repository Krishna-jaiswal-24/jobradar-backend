import {
  getAllExams,
  createExam,
  addQuestionToExam,
  getAllQuestionsForExam,
} from "../controllers/Quiz.js";
import express from "express";

const QuizRouter = express.Router();

QuizRouter.post("/exam", createExam);
QuizRouter.get("/exams", getAllExams);
QuizRouter.post("/exam/question", addQuestionToExam);
QuizRouter.get("/exam/questions/:examId", getAllQuestionsForExam);

export default QuizRouter;
