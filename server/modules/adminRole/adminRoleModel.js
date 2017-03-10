var mongo = require('mongoose');

var Schema = mongo.Schema;

var userSchema = new Schema({
    id: String
});

module.exports = mongo.model('Admin', userSchema);

