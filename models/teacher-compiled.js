/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');
var Person = require('./person.js');

// create a schema
var teacherSchema = new mongoose.Schema({ location: String });
var Teacher = Person.discriminator('Teacher', teacherSchema);

module.exports = Teacher;

//# sourceMappingURL=teacher-compiled.js.map