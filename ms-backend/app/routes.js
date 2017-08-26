var NoteModel = require('./models/note');
var post = require('./models/post');

module.exports = function (app) {
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
		console.log(req.body);

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
