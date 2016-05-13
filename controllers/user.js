var userObj=require('../models/user');
var config = require('../config');
 var passwordHash = require('password-hash');
 var jwt    = require('jsonwebtoken'); 
 

 
exports.postUsers=function(req,res){


var user=new userObj();
     
     if(!req.body.id) 
     {
     	var hashed=passwordHash.generate(req.body.password);
     	user.email=req.body.email;
     user.password=hashed;
     user.name=req.body.name;
     user.role=req.body.role;
     user.save(function (err){

		if(err) {

         return res.status(404).json({message: 'Error saving user data: '+ err.message})
			}

		//console.log('User saved successfully');

		res.json({ success: true, message: 'User saved successfully' });

	});
}
  else
  {

  	console.log('update user');
  	var obj=new Object();
  	if(req.body.password)
  		obj.password=passwordHash.generate(req.body.password);
  	if(req.body.name)
  		obj.name=req.body.name;
  	if(req.body.email)
  		obj.email=req.body.email;
  	if(req.body.role)
  		obj.role=req.body.role;

    console.dir(obj);

    /*var hashed=passwordHash.generate(req.body.password);
     	user.email=req.body.email;
     user.password=hashed;
     user.name=req.body.name;
     user.role=req.body.role;*/
     userObj.update({_id: req.body.id}, { $set: obj}, function(err,result){
            
            if(err)

            	return  res.status(404).json({
        message: 'Incorrect User data : ' +err.message
      });

            	res.json({success: true, message: "User updated successfully"});

     });
     //comments
    /* userObj.findById({id: req.body.id}, function(err, user){

        if(err)
        {
        	 throw err;
        }
        console.log(user);

          

     });*/
     /*project.findById({id: id},function(err,prj){

 	if(err){
   			console.log(err);
   			return null;
   		}
   		console.log("Inside Controller : "+ project.name);
   		return prj;
   });*/

  }
};

exports.getUsers=function(req,res){


	/* email: { type: String, unique: true, required: true},
     password: { type: String, required: true},
     name: {type: String, required: true},
     role: {type: Array, required: true}*/

     userObj.find({}, function(err, users){

		if(err)
		{
			return res.status(404).json({message: "Error getting user data: "+ err.message});
		}
		res.json(users);
	});
};

exports.AuthenticateUser=function(req,res){
    console.log('admin user'+ req.get('AdminUser'));
   if(req.get('AdminUser'))
   {
      console.log(config.adminuser + ","+  config.password);
   	  if(req.body.username==config.adminuser && req.body.password == config.password){

   	  	var token=jwt.sign({name:config.adminuser, ip:req.connection.remoteAddress},config.secret, {
    					expiresIn:1440 // expires in 24 hours
    			});

   	  	res.json({
    				success: true,
    				message: 'Enjoy your token!',
    				token: token
    			});
   	  }
   }
  else{
  // -- end of admin user
    userObj.findOne({
    	email : req.body.username
    }, function(err, user){

    	if(err) throw err;
    	if(!user){

    		res.json({ success: false, message: 'Authentication failed. User not found'});

    	}else if (user){

    		//check if password matchese.

    		if(!passwordHash.verify(req.body.password,user.password))
    		{
    			res.json({sucess: false, message: 'Authentication failed. Wrong password'});
    		}else{
    				console.log(req.connection.remoteAddress);
    			var token=jwt.sign({name:user.name, ip:req.connection.remoteAddress}, config.secret, {
    					expiresInMinutes:1440 // expires in 24 hours
    			});

    			res.json({
    				success: true,
    				message: 'Enjoy your token!',
    				token: token
    			});
    		}


    	}
    });
}

};
