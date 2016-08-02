/**
 * Created by Dani on 03.07.2016.
 */
// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

/**
 * Security
 */
var salt = bcrypt.genSaltSync(10);

// create a schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, required: true },
    created_at: Date,
    group: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

/**
 * Before save
 */
userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;

    if (this.password) {
        // Setting new password: hash it
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;

//# sourceMappingURL=user-compiled.js.map