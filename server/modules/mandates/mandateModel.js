const mongo = require('mongoose');
const userModel = require
const Schema = mongo.Schema;

const mandateSchema = new Schema({
    name:String,
    admins:[{type: mongo.Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = mongo.model('mandates',mandateSchema);