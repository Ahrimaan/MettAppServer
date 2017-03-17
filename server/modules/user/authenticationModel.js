var mongo = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongo.Schema;

var authenticationSchema = new Schema({
    id: String,
    guid: String
});

authenticationSchema.pre('save', function(next){
  self = this;
  self.guid = uuid.v4();
  next();
});

module.exports = mongo.model('authenticationRequest', authenticationSchema);