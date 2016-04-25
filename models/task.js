// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports

var taskSchema=new mongoose.Schema({
	 projectid: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'projects'},
     title: { type: String,  required: true},
     assignedto: { type:mongoose.Schema.Types.ObjectId, required:true, ref: 'users'},
     state: {type: String, required: true},
     priority: {type: String, required: true},
     description: {type: String},
     history:[Array]

});

taskSchema.pre('save', function(callback){

	var task=this;
	//console.log('user from pre save'+ user.name);
	callback();

});

module.exports = mongoose.model('Task', taskSchema);

