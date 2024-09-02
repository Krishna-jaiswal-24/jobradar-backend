import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String, required: [true, "Please provide a name"],
	}, email: {
		type: String, required: [true, "Please provide an email"], unique: true, validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			}, message: props => `${props.value} is not a valid email address!`
		}
	}, password: {
		type: String, required: [true, "Please provide a password"],
	}, jobsApplied: [{
		type: mongoose.Schema.Types.ObjectId, ref: "Job",
	}], phoneNumber: {
		type: String, validate: {
			validator: function (v) {
				return /^\+?[1-9]\d{1,14}$/.test(v);
			}, message: props => `${props.value} is not a valid phone number!`
		}
	}, role: {
		type: String, enum: ["user", "admin"], default: "user",
	},
}, {
	timestamps: true, toJSON: {
		transform: function (doc, ret) {
			delete ret.password;
			return ret;
		}
	}, toObject: {
		transform: function (doc, ret) {
			delete ret.password;
			return ret;
		}
	}
});

const User = mongoose.model("User", UserSchema);

export default User;