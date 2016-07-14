/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');

// create a schema
var metricSchema = new mongoose.Schema({ name: String });
var Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;

//# sourceMappingURL=metric-compiled.js.map