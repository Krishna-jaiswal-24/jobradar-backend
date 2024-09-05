import {
  getAllExams,
  createExam,
  addQuestionToExam,
  getAllQuestionsForExam,
  getExamById,
} from "../controllers/Quiz.js";
import express from "express";

const QuizRouter = express.Router();

QuizRouter.post("/exam", createExam);
QuizRouter.get("/exams", getAllExams);
QuizRouter.get("/exams/:examId", getExamById);
QuizRouter.post("/exam/question", addQuestionToExam);
QuizRouter.get("/exam/questions/:examId", getAllQuestionsForExam);

export default QuizRouter;
