/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var gradeSchema = new Schema({
    exam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    }],
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }],
    score: {type: Number, required: true}
});


var Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;