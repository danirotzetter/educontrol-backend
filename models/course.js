/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Exam = require('./exam').schema;
var Student = require('./student').schema;

// create a schema
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    exams: [Exam],
    students : [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});


var Course = mongoose.model('Course', courseSchema);

module.exports = Course;