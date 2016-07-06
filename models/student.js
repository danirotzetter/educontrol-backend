/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');
var Person = require('./person.js');


// create a schema
var studentSchema = new mongoose.Schema({birthday:Date});
var Student = Person.discriminator('Student', studentSchema);

module.exports = Student;