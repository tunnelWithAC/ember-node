var NoteModel = require('./models/note');
var post = require('./models/post');


module.exports = function (app) {
	/*
	10.34
	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/api/students', function(rep, res){
		if(req.headers.authorization !== 'Bearer secretcode/ secret_token'){
		return res.status(401).send('Unauthorized');
	}
		return res.status(200).send({
		students: [
		{ id:1, name:'Conall'},
		{ id: 2, name:'Erik'}
	]
	})
	});
	*/
	app.post('/token', function(req, res){
		if(req.body.grant_type === 'password'){
			if(req.body.password === 'conall'){
				res.status(200).send(' { "access_token" : "secret_token" }');
			} else {
				res.status(400).send(' { "error" : "invalid_grant" }');
			}
		}	else {
			res.status(400).send(' { "error" : "unsupported_grant_type" }');
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
