const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

UserSchema.pre("save", function (next) {
    var user = this;
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });


});

const User = mongoose.model('user', UserSchema);

module.exports = User;