/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');
var District = require('./district').schema;

// create a schema
var Schema = mongoose.Schema;
var regionSchema = new Schema({
    name: {type: String, required: true},
    districts: [District], // Sub documents
});
var Region = mongoose.model('Region', regionSchema);

module.exports = Region;