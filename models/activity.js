/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Value = require('./value').schema;

// create a schema
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: {type: String, required: true},
    values: [Value], // Sub documents
    metrics : [{ type: Schema.Types.Mixed, ref: 'Metric' }] // Mixed in order to be able to send the metrics as array of objects (as opposed to array of object ids) during the save operation
});


var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;