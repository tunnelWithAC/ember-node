var NoteModel = require('./models/note');
var post = require('./models/post');
var userModel = require('./models/user');
var uservoteModel = require('./models/uservote');
//var jwt = require('jwt-simple');

module.exports = function (app) {

app.post('/token', function(req, res){

	if(req.body.grant_type === 'password'){

		var email = req.body.email;
		var password = req.body.password;
		userModel.findOne({ email: email, password: password }, 'username password', function(err, user){
			if(err){
				console.error(err);
			} else{

				if(user === null){
					res.status(200).send(' { "error" : "invalid_grant", display_message : "Failed to log in" }');
				}
				else{
					res.status(200).send({data : { access_token: 'secret_token', user: {
						id: user._id
					} }}  );
					/*var expires = new Date();
					expires.setDate((new Date()).getDate() + 1);
					var token = jwt.encode({
					username: username,
					expires: expires
				}, app.get('jwtTokenSecret'));

				tokensArray.push(token);
				res.json({ access_token: token, username: username, success: true});*/
			}
		}
	});

}	else {
	res.status(200).send(' { "error" : "unsupported_grant_type", display_message : "Failed to log in" }');
}
});

app.get('/api/',function(req,res) {
	res.send('Working');
});

function getPosts(res) {
	post.find(function (err, posts) {
		if (err) {
			res.send(err);
		}
		res.send({data:posts}); // return all workouts in JSON format
	});
};

app.get('/api/posts', function(req,res) {
	getPosts(res);
});

app.post('/api/posts', function (req, res) {
	console.log("body" + req.body);
	/*
	String newFileName = "my-image";
	File imageFile = new File("/users/victor/images/image.png");
	GridFS gfsPhoto = new GridFS(db, "photo");
	GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
	gfsFile.setFilename(newFileName);
	gfsFile.save();
	*/
	post.create({
		//title: req.body.post.title,
		content: req.body.post.content,
		author: req.body.post.author,
		votes: 0
	}, function (err) {
		if (err)
		res.send(err);
		// get and return all the todos after you create another
		console.log("Post Created:" + req.body.post.content);
	});
});

/*app.get('/api/users/:id', function(req, res){
	console.log("PARAMS" + req.params.id);
	userModel.findOne({_id : req.params.id}), function(err, user){
		console.log(user);
		if(err){
			console.error(err);
		} else{
			res.send(user);
		}
	}
});*/

app.post('/api/users', function (req, res) {

	var username = req.params.name;
	var password = req.params.password;
	userModel.findOne({ username: username, password: password }, 'username password', function(err, user){
		if(err){
			console.error(err);
		} else{
			console.info('User: ' + user);
			if(user === null){
				user.create({
					//title: req.body.post.title,
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				}, function (err) {
					if (err)
					res.send(err);
				});
			}
			else{
				console.log('Sending err response');
				res.status(403);
				res.json({status: 'Email already exists', success: false});
				/*var expires = new Date();
				expires.setDate((new Date()).getDate() + 1);
				var token = jwt.encode({
				username: username,
				expires: expires
			}, app.get('jwtTokenSecret'));

			tokensArray.push(token);
			res.json({ access_token: token, username: username, success: true});*/
		}
	}
});


});

app.get('/api/uservotes', function(req,res) {
	uservoteModel.find({},function(err,uservotes) {
		if(err) {
			res.send(err);
		}
		else {
			res.send({data:uservotes});
		}
	});
});


app.get('/api/notes', function(req,res) {
	NoteModel.find({},function(err,docs) {
		if(err) {
			res.send(err);
		}
		else {
			res.send({data:docs});
		}
	});
});

};
