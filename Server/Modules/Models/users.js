const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	First: {
		type: String,
		default: "NULL"
	},
	Last: {
		type: String,
		default: "NULL"
	},
	Phone: {
		type: String,
		default: "NULL"
	},
	permission:{
		type: String,
		require:true
	},
	IPs: [{
		type: String,
		require: true
	}],
	sessionKeys : [{
		type : String
	}]
});

let users = module.exports = mongoose.model('users', userSchema);
