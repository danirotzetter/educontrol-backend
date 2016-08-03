/**
 * Created by Dani on 03.07.2016.
 */
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var valueSchema = new Schema({
    activity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    }],
    metric: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Metric',
        required: true
    }],
    school: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }],
    figure: { type: Number, required: true }
});

var Value = mongoose.model('Value', valueSchema);

module.exports = Value;

//# sourceMappingURL=value-compiled.js.map