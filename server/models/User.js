const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	register_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', userSchema);
