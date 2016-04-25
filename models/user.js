// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports

var userSchema=new mongoose.Schema({
     email: { type: String, unique: true, required: true},
     password: { type: String, required: true},
     name: {type: String, required: true},
     role: {type: Array, required: true}

});

userSchema.pre('save', function(callback){

	var user=this;
	console.log('user from pre save'+ user.name);
	callback();

});

module.exports = mongoose.model('User', userSchema);

