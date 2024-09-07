import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    salary: {
      type: Number,
    },
    applyLink: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    jobSector: {
      type: String,
      enum: ["Government", "Private"],
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    experience: {
      type: Number,
      min: [0, "Experience must be a positive number"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobsSchema);

export default Job;
