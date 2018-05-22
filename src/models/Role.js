const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String
    }
})

const Role = mongoose.model('role', RoleSchema);

module.exports = Role;