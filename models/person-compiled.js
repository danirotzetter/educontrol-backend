/**
 * Created by Dani on 05.07.2016.
 *Base class for persons
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String }
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;

//# sourceMappingURL=person-compiled.js.map