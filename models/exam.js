/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Grade = require('./grade');

// create a schema
var Schema = mongoose.Schema;

var examSchema = new Schema({
    name: {type: String, required: true},
    date: {type: Date},
    grades: [Grade], // Sub documents
});


var Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;