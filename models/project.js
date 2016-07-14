/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Activity = require('./activity').schema;
var Metric = require('./metric').schema;

// create a schema
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    activities: [Activity]
});


var Project = mongoose.model('Project', projectSchema);

module.exports = Project;