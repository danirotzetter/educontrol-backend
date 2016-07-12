/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Exam = require('./exam').schema;

// create a schema
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    exams: [Exam]
});


var Course = mongoose.model('Course', courseSchema);

module.exports = Course;