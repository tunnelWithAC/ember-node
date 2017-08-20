var mongoose = require('mongoose');


var set = new mongoose.Schema({
	setID: { type: String, default: null },
	weight: { type: Number, default: null },
	reps: { type: Number, default: null },
	sets: { type: Number, default: null }
});

var set = new mongoose.Schema({
  set1: set,
  set2: set,
  set3: set,
  set4: set,
  set5: set
})

var exercise = new mongoose.Schema({
  name: String,
  sets: set,
  exerciseVolume: Number
});

var exercises = new mongoose.Schema({
  exercise1: exercise,
  exercise2: exercise,
  exercise3: exercise,
  exercise4: exercise,
  exercise5: exercise
})

var user = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})


module.exports = mongoose.model('Workout', {
    userID: String,
    name: String,
    text: {
        type: String,
        default: ''
    },
    date: { type: Date, default: Date.now },
    exercises: exercises,
		accessoryWork: String,
    /*exercise1: exercise,
    exercise2: exercise,
    exercise3: exercise,
    exercise4: exercise,
    exercise5: exercise,*/
    workoutVolume: { type: Number, default: 0 }

});
