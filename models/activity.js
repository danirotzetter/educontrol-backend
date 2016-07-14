/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Value = require('./value');

// create a schema
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: {type: String, required: true},
    values: [Value], // Sub documents
    metrics : [{ type: Schema.Types.ObjectId, ref: 'Metric' }]
});


var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;