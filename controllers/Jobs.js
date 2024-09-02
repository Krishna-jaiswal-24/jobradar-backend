import Job from "../models/Jobs.js";
import mongoose from "mongoose"; // Ensure mongoose is imported to use Types.ObjectId

// Helper function to validate Object IDs
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getJobs = async (req, res) => {
	try {
		const jobs = await Job.find();
		res.status(200).json({success: true, data: jobs});
	} catch (error) {
		res.status(500).json({success: false, message: "Failed to fetch jobs", error: error.message});
	}
}

const addJob = async (req, res) => {
	const job = req.body;
	const newJob = new Job(job);

	try {
		await newJob.save();
		res.status(201).json({success: true, data: newJob});
	} catch (error) {
		res.status(409).json({success: false, message: "Failed to create job", error: error.message});
	}
}

const updateJob = async (req, res) => {
	const {id: _id} = req.params;
	const job = req.body;

	if (!isValidObjectId(_id)) {
		return res.status(404).json({success: false, message: "No job with that ID"});
	}

	try {
		const updatedJob = await Job.findByIdAndUpdate(_id, {...job, _id}, {new: true});

		if (!updatedJob) {
			return res.status(404).json({success: false, message: "Job not found"});
		}

		res.status(200).json({success: true, data: updatedJob});
	} catch (error) {
		res.status(500).json({success: false, message: "Failed to update job", error: error.message});
	}
}

const deleteJob = async (req, res) => {
	const {id} = req.params;

	if (!isValidObjectId(id)) {
		return res.status(404).json({success: false, message: "No job with that ID"});
	}

	try {
		const job = await Job.findByIdAndDelete(id);

		if (!job) {
			return res.status(404).json({success: false, message: "Job not found"});
		}

		res.status(200).json({success: true, message: 'Job deleted successfully'});
	} catch (error) {
		res.status(500).json({success: false, message: "Failed to delete job", error: error.message});
	}
}

const getJobById = async (req, res) => {
	const {id} = req.params;

	if (!isValidObjectId(id)) {
		return res.status(404).json({success: false, message: "No job with that ID"});
	}

	try {
		const job = await Job.findById(id);

		if (!job) {
			return res.status(404).json({success: false, message: "Job not found"});
		}

		res.status(200).json({success: true, data: job});
	} catch (error) {
		res.status(500).json({success: false, message: "Failed to fetch job", error: error.message});
	}
}

export {getJobs, addJob, updateJob, deleteJob, getJobById};