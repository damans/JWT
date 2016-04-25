// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model
var userControler=require('./controllers/user');
  var passwordHash = require('password-hash');
 var projectController=require('./controllers/Project'); 
 var taskController=require('./controllers/Task');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3001; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function (req, res ){

	var usr=new User({
		name: 'Daman Singh',
		password: 'password',
		admin: true
	});

	usr.save(function (err){

		if(err) throw err;

		console.log('User saved successfully');

		res.json({ success: true });

	});
});
// API ROUTES -------------------


// Get an instance of the router  for API routes
 var apiRoutes= express.Router();

// route to authenticate a user

apiRoutes.post('/authenticate', function(req, res){

 // find the user
 userControler.AuthenticateUser(req,res);
 // check for admin user
 //console.log('value='+ req.get('AdminUser'));
  
   
});

// route middleware to verify  a token
apiRoutes.use(function(req,res, next){

// check header for token parameter


var token = req.headers['x-access-token'];
// decode

if(token)
{
  
  jwt.verify(token, app.get('superSecret'), function(err,decoded){

  		if(err){
  			return res.json({success:false, message: 'Failed to authenticate token'});
  		}
  		else
  		{
  			req.decoded=decoded;
  			next();
  		}
  });

}else{

   return res.status(403).send({sucess: false, message: 'No token provided'});
}

});




apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
/*apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});*/   

apiRoutes.route('/Projects')
.post(projectController.postProject)
.get(projectController.getProjects);

apiRoutes.route('/Tasks')
.post(taskController.postTasks)
.get(taskController.getTasks);

apiRoutes.route('/Users')
.post(userControler.postUsers)
.get(userControler.getUsers);

// apply the routes to our application with the prefix /api
app.use('/api/V1', apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);