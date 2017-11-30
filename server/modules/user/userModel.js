const mongo = require('mongoose');
const Schema = mongo.Schema;

const userSchema = new Schema({
    userId:String,
    userName:String,
    mandateId:{type: mongo.Schema.Types.ObjectId, ref: 'mandates'}
});

module.exports = mongo.model('user', userSchema);