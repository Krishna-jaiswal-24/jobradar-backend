import mongoose, { Schema } from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    examDescription: {
      type: String,
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
    },
    examQuestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exams", ExamSchema);

export default Exam;
