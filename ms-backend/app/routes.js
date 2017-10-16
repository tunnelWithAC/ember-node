var postModel = require('./models/post');
var commentModel = require('./models/comment');
var userModel = require('./models/user');
var uservoteModel = require('./models/uservote');
//var jwt = require('jwt-simple');

module.exports = function (app) {

	app.post('/token', function(req, res){

		console.log(req.body);
		if(req.body.grant_type === 'password'){

			var email = req.body.username;
			var password = req.body.password;
			userModel.findOne({ email: email, password: password }, 'username password', function(err, user){
				if(err){
					console.error(err);
				} else{

					if(user === null){
						console.log("user null");
						res.status(200);
						res.json({error: "invalid_grant", display_message : "Failed to log in" });
						//res.status(200).send(' { "error" : "invalid_grant", display_message : "Failed to log in" }');
					}
					else{
						console.log("user null");
						res.status(200).send( { access_token: 'secret_token', user: {
							id: user._id
						} }  );
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

app.get('/api/posts/:post_id', function(req,res) {

	var post_id = req.params.post_id;

	postModel.findOne({ _id: post_id }, function(err, post){
		if(err){
			console.error(err);
			res.send(err);
		} else{
			console.log({data:post});
			res.send({data:post});
		}
	});
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
		user: req.body.post.user,
		votes: 0
	}, function (err) {
		if (err)
		res.send(err);
		// get and return all the todos after you create another
		console.log("Post Created:" + req.body.post.content);
	});
});

app.get('/api/comments/', function(req,res) {


	console.log("QUERY" + req.query.post);
	var post = req.query.post;
	if(post){
		commentModel.find({ post: post }, function(err, comment){
			if(err){
				console.error(err);
				res.send(err);
			} else{
				console.log({data:comment});
				res.send({data:comment});
			}
		});
	}
	else {
		console.log("find all");
		commentModel.find(function (err, comments) {
			if (err) {
				res.send(err);
			}
			res.send({data:comments}); // return all workouts in JSON format
		});
	}

});

app.post('/api/comments', function (req, res) {
	var content = req.body.comment.content;
	var post = req.body.comment.post;
	console.log("Post for comment >>>", post);
	commentModel.create({
		post: req.body.comment.post,
		content: content,
		user: req.body.comment.user,
		votes: 0
	}, function (err) {
		if (err)
		res.send(err);
		console.log("Comment created:" + content);
	});
});

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
});});

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
					post.totalVotes++;
					post.save();

				}
			});
		}
		res.status(200).send({data : { status: upvoted }}  );
	});

});


app.post('/api/downvote/', function(req,res) {
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
					post.totalVotes++;
					post.votes--;
					if(post.votes <= -5){
						post.visible = false;
					}
					post.save();

				}
			});
		}
		res.status(200).send({data : { status: downvoted }}  );
	});

});

};
