import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema({
	title: {
		type: String, required: [true, "Please provide a title"],
	}, description: {
		type: String, required: [true, "Please provide a description"],
	}, company: {
		type: String, required: [true, "Please provide a company name"],
	}, location: {
		type: String, required: [true, "Please provide a location"],
	}, salary: {
		type: Number, min: [0, "Salary must be a positive number"],
	}, applyLink: {
		type: String, required: [true, "Please provide an apply link"],
	}, jobType: {
		type: String, enum: ["full-time", "part-time", "contract", "internship"], required: true,
	}, remote: {
		type: Boolean, default: false,
	}, jobSector: {
		type: String, enum: ["Government", "Private"], required: true,
	}, dueDate: {
		type: Date, validate: {
			validator: function (value) {
				return value >= new Date();
			}, message: "Due date cannot be in the past",
		},
	}, experience: {
		type: Number, min: [0, "Experience must be a positive number"], default: 0,
	},
}, {timestamps: true});

const Job = mongoose.model("Job", JobsSchema);

export default Job;