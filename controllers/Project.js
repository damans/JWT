
var mongoose=require('mongoose');
var project=require('../models/project');
var ObjectId = mongoose.Types.ObjectId
exports.postProject=function(req,res){

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