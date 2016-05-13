/*
   Project controler for project related operations
   /*
    name: { type: String, required: true},
      	description: {type: String, required: false},
      	technology: {type: Array, required : false},
      	startdate: {type: Date, required: true},
      	duration: {type: Number, required: false},
      	expectedenddate: {type: Date, required:false},
      	actualcompletiondate: {type: Date, required: false}
   /
*/
var mongoose=require('mongoose');
var project=require('../models/project');
var ObjectId = mongoose.Types.ObjectId
exports.postProject=function(req,res){

  if(!req.body.id)
  {
  var newProject=new project();
  newProject.name=req.body.name;
  newProject.startdate=req.body.startdate;
  newProject.duration=req.body.duration;
   newProject.save(function(err){
   	if(err)
   	{

   		res.send(err);
   	}
   	else
   	{
       res.json({success:true, message:'project saved successfully.'});

   	}

   });
   }
   else
   {
      var newProject=new project();
       newProject.name=req.body.name;
       newProject.description= req.body.description;
       newProject.technology=req.body.technology;
       newProject.actualcompletiondate=req.body.actualcompletiondate; 
  newProject.startdate=req.body.startdate;
  newProject.duration=req.body.duration;
     //updating project
   	project.update({_id: req.body.id},{$set: newProject}, function(err,result){

   			if(err)
   				res.status(400).json({message: 'Incorrect project data.  '+ err.message});

   			res.json({success:true, message: 'Project updated successfully'});
   	});
   }
};

exports.getProjects=function(req,res){

	project.find({}, function(err, projects){

		if(err)
		{
			res.send(err);
		}
		res.json(projects);
	});
};

exports.findProjectById=function(id){
	//var ObjectId = mongoose.Types.ObjectId; 
//console.log("Id: "+id);
  // id=new ObjectId(id);
   project.findById({id: id},function(err,prj){

 	if(err){
   			console.log(err);
   			return null;
   		}
   		console.log("Inside Controller : "+ project.name);
   		return prj;
   });

};