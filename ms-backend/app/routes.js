var NoteModel = require('./models/note');
var postModel = require('./models/post');
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

function getPosts(res) {
	postModel.find(function (err, posts) {
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
	postModel.create({
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
				userModel.create({
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

	uservoteModel.find(function(err,uservotes) {
		if(err) {
			res.send(err);
		}
		res.send({data:uservotes}); // return all workouts in JSON format
		//res.status(200).send(' { "response" : "ok" }');
	});
});

app.post('/api/upvote/', function(req,res) {
	var u = req.body.user;
	var p = req.body.post;
	var updated = 0;
	var upvoted = false;

	// set the value of the uservote to 1, 0 , or -1
	uservoteModel.findOne({ user: u, post: p},function(err,uservote) {
		if(err) {
			res.send(err);
		}

		console.log("uservote search result"  + uservote);
		if(uservote !== null){
			if(uservote.value !== 1){
				upvoted = true;
			}
			uservote.value = 1;
			uservote.save(function(err) {
				if (err)
				console.log('error')
			});
		}
		else {
			// create uservote
			uservoteModel.create({
				value: 1,
				user: u,
				post: p
			}, function (err) {
				if (err)
				res.send(err);

			});
			upvoted = true;
		}

		console.log("upvoted: " + upvoted);
		if(upvoted){
			console.log("Updating post value");
			// update the value of the post votes
			postModel.findOne({ _id: p}, function(err, post) {
				if(err) {
					res.send(err);
				}
				else{
					console.log("Post" + post);
					updated = 1;
					post.votes++;
					post.save();

				}
			});
		}
		res.status(200).send({data : { status: upvoted }}  );
	});

});


app.post('/api/vote/', function(req,res) {
	var user = req.body.user;
	var post = req.body.post;
	var value = req.body.vote;
	var downvoted = false;

	// set the value of the uservote to 1, 0 , or -1
	uservoteModel.findOne({ user: user, post: post},function(err,uservote) {
		if(err) {
			res.send(err);
		}

		console.log("uservote search result"  + uservote);
		if(uservote !== null){
			if(uservote.value !== -1){
				downvoted = true;
			}
			uservote.value = -1;
			uservote.save(function(err) {
				if (err)
				console.log('error')
			});
		}
		else {
			// create uservote
			uservoteModel.create({
				value: -1,
				user: user,
				post: post
			}, function (err) {
				if (err)
				res.send(err);

			});
			downvoted = true;
		}

		console.log("downvoted: " + downvoted);
		if(downvoted){
			console.log("downvoted post value");
			// update the value of the post votesdownvoted
			postModel.findOne({ _id: post}, function(err, post) {
				if(err) {
					res.send(err);
				}
				else{
					console.log("Post" + post);

					post.votes--;
					post.save();

				}
			});
		}
		res.status(200).send({data : { status: downvoted }}  );
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
