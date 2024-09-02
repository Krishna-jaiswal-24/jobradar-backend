import express from "express";
import {addJob, deleteJob, getJobById, getJobs, updateJob} from "../controllers/Jobs.js";

const JobRouter = express.Router();

JobRouter.get("/", getJobs);
JobRouter.post("/", addJob);
JobRouter.put("/:id", updateJob);
JobRouter.delete("/:id", deleteJob);
JobRouter.get("/:id", getJobById);

export default JobRouter;