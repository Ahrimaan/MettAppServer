var mongo = require('mongoose');
var GuidGen = require('Guid');

var Schema = mongo.Schema;

var authenticationSchema = new Schema({
    id: String,
    guid: String
});

authenticationSchema.pre('save', function(next){
  self = this;
  self.guid = GuidGen.create();
  next();
});

module.exports = mongo.model('authenticationRequest', authenticationSchema);