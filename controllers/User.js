import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Utility function to validate required fields
const validateRequiredFields = (fields) => {
	return fields.every(field => field);
};

// Utility function to hash password
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const registerUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		// Validate input fields
		if (!validateRequiredFields([name, email, password])) {
			return res.status(400).json({success: false, message: "Please provide all required fields"});
		}

		// Check if the user already exists
		const existingUser = await User.findOne({email});
		if (existingUser) {
			return res.status(400).json({success: false, message: "User already exists"});
		}

		// Hash the password
		const hashedPassword = await hashPassword(password);

		// Create a new user
		const newUser = await User.create({name, email, password: hashedPassword});

		// Return success response
		res.status(201).json({success: true, message: "User created successfully", user: newUser});
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({success: false, message: "Server error: User could not be created"});
	}
};

const loginUser = async (req, res) => {
	try {
		const {email, password} = req.body;

		if (!validateRequiredFields([email, password])) {
			return res.status(400).json({success: false, message: "Please provide all required fields"});
		}

		const user = await User.findOne({email});
		if (!user) {
			return res.status(404).json({success: false, message: "User not found"});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({success: false, message: "Invalid credentials"});
		}

		res.status(200).json({success: true, message: "User logged in successfully", user});
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({success: false, message: "Server error: User could not be logged in"});
	}
};

const createAdmin = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		if (!validateRequiredFields([name, email, password])) {
			return res.status(400).json({success: false, message: "Please provide all required fields"});
		}

		const existingUser = await User.findOne({email});
		if (existingUser) {
			return res.status(400).json({success: false, message: "User already exists"});
		}

		const hashedPassword = await hashPassword(password);

		// Create a new admin user
		const newUser = await User.create({name, email, password: hashedPassword, role: "admin"});

		res.status(201).json({success: true, message: "Admin created successfully", user: newUser});
	} catch (error) {
		console.error("Error creating admin:", error);
		res.status(500).json({success: false, message: "Server error: Admin could not be created"});
	}
};

export {registerUser, loginUser, createAdmin};