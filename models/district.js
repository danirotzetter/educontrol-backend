/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;
var districtSchema = new Schema({
    name: {type: String, required: true},
});
var District= mongoose.model('District', districtSchema);

module.exports = District;