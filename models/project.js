// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema= new mongoose.Schema(
      {
         
      	name: { type: String, required: true},
      	description: {type: String, required: false},
      	technology: {type: Array, required : false},
      	startdate: {type: Date, required: true},
      	duration: {type: Number, required: false},
      	expectedenddate: {type: Date, required:false},
      	actualcompletiondate: {type: Date, required: false}
        
      }
	);

projectSchema.pre('save', function(callback){

	var project=this;
	console.log('project from pre save'+ project.name);
	callback();

});


module.exports = mongoose.model('Project', projectSchema);