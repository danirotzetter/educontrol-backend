/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
});


var Course = mongoose.model('Course', courseSchema);

module.exports = Course;