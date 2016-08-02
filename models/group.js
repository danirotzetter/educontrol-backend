/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');


// create a schema
var groupSchema = new mongoose.Schema({name:String});
var Group = mongoose.model('Group', groupSchema);

module.exports = Group;