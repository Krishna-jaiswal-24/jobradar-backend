import mongoose, { Schema } from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    examName: {
      type: String,

    },
    examDescription: {
      type: String,

    },
    examDate: {
      type: Date,

    },
    examDuration: {
      type: Number,

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
