import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,

    },
    options: [{ type: String }],
    correctAnswer: {
      type: String,

    },
    explanation: {
      type: String,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams",
    },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", QuestionSchema);

export default Questions;
