var NoteModel = require('./models/note');
var post = require('./models/post');

module.exports = function (app) {
	app.get('/api/',function(req,res) {
		res.send('Working');
	});

	function getPosts(res) {

	};

	app.get('/api/posts', function(req,res) {
		post.find(function (err, posts) {
			if (err) {
				res.send(err);
			}
			res.send({data:docs}); // return all workouts in JSON format
		});
	});

	app.get('/api/notes', function(req,res) {
		NoteModel.find({},function(err,docs) {
			if(err) {
				res.send(err);
			}
			else {
				console.log(docs);
				res.send({data:docs});
			}
		});
	});
	/*app.post('/api/post', function (req, res) {

		post.create({
			name: req.body.name
		},

		done: false
	}), function (err, workout) {
		if (err)
		res.send(err);

		// get and return all the todos after you create another
		getPosts(res);
	});
	//getWorkouts(res);
	});

	app.delete('/api/workout/:workout_id', function (req, res) {
	Workout.remove({
		_id: req.params.workout_id
	}, function (err, workout) {
		if (err)
		res.send(err);

		getWorkouts(res);
	});
	});*/


};
