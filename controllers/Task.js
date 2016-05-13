

var task=require('../models/task');
var taskHistory= require('../models/Taskhistory');
var projectCtrl=require('./Project');
exports.postTasks=function(req,res){
/*  title: { type: String,  required: true},
     assignedto: { type: String, required: true},
     state: {type: String, required: true},
     priority: {type: String, required: true},
     description: {type: String},
     history:[Array]*/
  var newtask=new task();
  newtask.projectid=req.body.projectid;
  newtask.title=req.body.title;
  newtask.assignedto=req.body.assignedto;
  newtask.state=req.body.state;
  newtask.priority=req.body.priority;
  newtask.description=req.body.description;
  newtask.history=req.body.history;
  var project=projectCtrl.findProjectById(newtask.projectid);
 // console.log(project);
  if(true)//if(project!=undefined)
  {

   newtask.save(function(err){
   	if(err)
   	{

   		res.send(err);
   	}
   	else
   	{
       res.json({success:true, message:'task saved successfully.'});

   	}
   });
 }
 else

 {

    res.json({success: false, message: 'Project does not existis'});
 }

};

exports.getTasks=function(req,res){

	task.find({}, function(err, tasks){

		if(err)
		{
			res.send(err);
		}
		res.json(tasks);
	});
};

exports.getTasksByUserId=function(req,res){

  task.find({assignedto: req.body.id})
  .populate('projectid')
  .exec(function(err, tasksRes){
     if(err)
     {
      res.status(400).json({success:fasle, message: 'Problem finding task for user'});
     }

     res.json(tasksRes);

  });
};

