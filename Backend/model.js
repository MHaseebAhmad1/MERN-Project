const mongoose = require('mongoose');

const userdata = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: String,

});

var user = mongoose.model('student', userdata);
module.exports = user;