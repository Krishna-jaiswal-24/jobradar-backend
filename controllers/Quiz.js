import Exam from "../models/Exams.js";
import Questions from "../models/Questions.js";
import mongoose from "mongoose";

const createExam = async (req, res) => {
  try {
    const exam = req.body;

    if (!exam) {
      return res.status(400).json({ message: "Exam details are required" });
    }

    const newExam = new Exam({
      examName: exam.examName,
      examDescription: exam.examDescription,
      examDate: exam.examDate,
      examDuration: exam.examDuration,
    });
    await newExam.save();

    return res
      .status(201)
      .json({ newExam, message: "Exam created successfully" });
  } catch (error) {}
};

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    return res
      .status(200)
      .json({ exams, message: "Exams fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching exams", error });
  }
};

const addQuestionToExam = async (req, res) => {
  try {
    const { examId, question, options, correctAnswer, explanation } = req.body;

    if (!examId || !question || !correctAnswer) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const newQuestion = new Questions({
      question,
      options,
      correctAnswer,
      explanation,
      exam: examId,
    });

    await newQuestion.save();

    // Add the question reference to the exam
    exam.examQuestions.push(newQuestion._id);
    await exam.save();

    return res
      .status(201)
      .json({ newQuestion, message: "Question added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while adding the question", error });
  }
};

const getAllQuestionsForExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId).populate("examQuestions");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await Questions.find({ exam: examId });

    return res.status(200).json(questions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching questions", error });
  }
};

const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json(exam);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching exam", error });
  }
};
const deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;

    // Check if examId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid exam ID format" });
    }

    const exam = await Exam.findByIdAndDelete(examId).then((exam) => {
      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }
    });

    return res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error); // Log the error
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the exam", error });
  }
};
const updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = req.body;

    if (!exam) {
      return res.status(400).json({ message: "Exam details are required" });
    }

    const updatedExam = await Exam.findByIdAndUpdate(examId, exam, {
      new: true,
    });

    return res
      .status(200)
      .json({ updatedExam, message: "Exam updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while updating exam", error });
  }
};

export {
  createExam,
  getAllExams,
  addQuestionToExam,
  getAllQuestionsForExam,
  getExamById,
  deleteExam,
  updateExam,
};
