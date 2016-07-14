/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');
var Activity = require('./exam').schema;
var Metric = require('./student').schema;

// create a schema
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    exams: [Activity],
    students: [{ type: Schema.Types.ObjectId, ref: 'Metric' }]
});

var Project = mongoose.model('Project', courseSchema);

module.exports = Project;

//# sourceMappingURL=course-compiled.js.map

//# sourceMappingURL=course-compiled-compiled.js.map